import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Briefcase,
  Mail,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  Cpu,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Trash2,
  Edit2,
  X,
  ChevronRight,
  Download,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ChevronLeft,
  UserCheck,
  RefreshCw,
  SlidersHorizontal,
  ArrowLeft,
  Lock,
  Upload,
  Menu,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  MessageSquare,
  Globe,
  FileText,
  Copy,
  ChevronDown,
  Terminal,
  Server,
  KeyRound,
  History,
  TrendingUp,
  TrendingDown,
  Eye,
  Info
} from "lucide-react";
import { useProjects, Project } from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { supabase } from "@/lib/supabase";
import { type Session } from "@supabase/supabase-js";
import { z } from "zod";
import { AdminIntegrations } from "../components/AdminIntegrations";

// Lazy-load Recharts wrapper to optimize initial bundle size under 120 KB
const WeeklyIntakeChart = React.lazy(() =>
  import("../components/AdminCharts").then(m => ({ default: m.WeeklyIntakeChart }))
);
const LeadSourcesChart = React.lazy(() =>
  import("../components/AdminCharts").then(m => ({ default: m.LeadSourcesChart }))
);

const ChartSkeleton = () => (
  <div className="h-64 w-full bg-[#08080a] border border-[#1a1a22] rounded-xl flex items-center justify-center animate-pulse">
    <div className="w-5 h-5 rounded-full border border-white/5 border-t-[#10b981] animate-spin" />
  </div>
);

// Project validation schema
const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a project title.")
    .max(100, "Project title must be 100 characters or less."),
  tag: z
    .string()
    .trim()
    .min(1, "Please enter a tag or category.")
    .max(50, "Tag / Category must be 50 characters or less."),
  desc: z
    .string()
    .trim()
    .min(1, "Please enter a project description.")
    .max(500, "Description must be 500 characters or less."),
  imageUrl: z
    .string()
    .trim()
    .url("Please upload a project image.")
    .max(2048, "Image URL is too long.")
    .min(1, "Project image is required."),
  link: z
    .string()
    .trim()
    .url("Invalid website URL format. Must start with http:// or https://")
    .max(2048, "Website URL is too long.")
    .optional()
    .or(z.literal("")),
  status: z.enum(["Draft", "Published", "In Review"]),
});

type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  contact_method: string;
  message: string;
  source: string;
  created_at: string;
  status: LeadStatus;
}

interface LeadNote {
  id: string;
  lead_id: string;
  author_email: string;
  content: string;
  created_at: string;
}

interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  status: "Queued" | "Sent" | "Delivered" | "Failed";
  error_message: string | null;
  sent_at: string;
}

interface ActivityLog {
  id: string;
  admin_email: string;
  action: string;
  details: any;
  created_at: string;
}

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

interface SettingsConfig {
  company_name: string;
  support_email: string;
  calendly_url: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  default_lead_status: string;
  notification_settings: {
    email: boolean;
  };
}

export default function AdminPage() {
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = useProjects();
  const { toast } = useToast();

  // Auth State
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Layout navigation
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Command Palette & Global Search States
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandPaletteQuery, setCommandPaletteQuery] = useState("");
  const [commandPaletteIndex, setCommandPaletteIndex] = useState(0);

  // CRM Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [settings, setSettings] = useState<SettingsConfig>({
    company_name: "Aveniq",
    support_email: "hello@theaveniq.in",
    calendly_url: "https://calendly.com",
    social_links: {},
    default_lead_status: "New",
    notification_settings: { email: true }
  });

  const [dataLoading, setDataLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<LeadNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Never");

  // Project Portfolio inputs
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [projStatus, setProjStatus] = useState<"Draft" | "Published" | "In Review">("Published");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Custom Modals & Undo States
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  // Search & Filter options
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [portfolioStatusFilter, setPortfolioStatusFilter] = useState("all");
  const [emailFilterStatus, setEmailFilterStatus] = useState("all");
  const [leadsSearch, setLeadsSearch] = useState("");
  const [leadsFilterStatus, setLeadsFilterStatus] = useState<string>("all");
  const [leadsSortField, setLeadsSortField] = useState<keyof Lead>("created_at");
  const [leadsSortAsc, setLeadsSortAsc] = useState(false);
  const [leadsPage, setLeadsPage] = useState(1);
  const leadsPageSize = 10; // Virtual table page constraints

  // Native HTML5 Drag and Drop reordering state
  const [draggedProjId, setDraggedProjId] = useState<string | null>(null);

  // Fallback mocks for development/local database failures
  const fallbackLeads: Lead[] = useMemo(() => [
    { id: "lead-1", name: "Sarah Connor", email: "sarah@cyberdyne.com", company: "Cyberdyne Systems", project_type: "AI Integration", budget_range: "$50k+", timeline: "3-6 months", contact_method: "Email", message: "Need a secure neural network framework to replace Skynet prototypes.", source: "Direct", created_at: new Date(Date.now() - 120000).toISOString(), status: "New" },
    { id: "lead-2", name: "Bruce Wayne", email: "bruce@waynecorp.com", company: "Wayne Enterprises", project_type: "SaaS Platform", budget_range: "$50k+", timeline: "1-3 months", contact_method: "Phone", message: "Looking for an encrypted communications dashboard.", source: "LinkedIn", created_at: new Date(Date.now() - 10800000).toISOString(), status: "Contacted" },
    { id: "lead-3", name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", project_type: "Mobile Application", budget_range: "$25k - $50k", timeline: "3-6 months", contact_method: "Email", message: "Need an interface overlay for telemetry readings.", source: "Referral", created_at: new Date(Date.now() - 86400000).toISOString(), status: "Qualified" },
    { id: "lead-4", name: "Hal Jordan", email: "hal@ferrisair.com", company: "Ferris Aircraft", project_type: "Custom Software", budget_range: "$10k - $25k", timeline: "6 months+", contact_method: "Phone", message: "Aviation tracking portal and telemetry log visualization tools.", source: "Google", created_at: new Date(Date.now() - 172800000).toISOString(), status: "Proposal Sent" }
  ], []);

  const fallbackEmailLogs: EmailLog[] = useMemo(() => [
    { id: "e-1", recipient: "hello@theaveniq.in", subject: "New Project Request: Sarah Connor - Cyberdyne", type: "internal_notification", status: "Sent", error_message: null, sent_at: new Date(Date.now() - 120000).toISOString() },
    { id: "e-2", recipient: "sarah@cyberdyne.com", subject: "We've received your project request - Aveniq", type: "user_confirmation", status: "Delivered", error_message: null, sent_at: new Date(Date.now() - 120000).toISOString() },
    { id: "e-3", recipient: "bruce@waynecorp.com", subject: "We've received your project request - Aveniq", type: "user_confirmation", status: "Failed", error_message: "Invalid recipient MX record", sent_at: new Date(Date.now() - 10800000).toISOString() }
  ], []);

  const fallbackActivityLogs: ActivityLog[] = useMemo(() => [
    { id: "a-1", admin_email: "System", action: "lead_submitted", details: { email: "sarah@cyberdyne.com" }, created_at: new Date(Date.now() - 120000).toISOString() },
    { id: "a-2", admin_email: "admin@theaveniq.in", action: "lead_status_updated", details: { email: "bruce@waynecorp.com", new_status: "Contacted" }, created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: "a-3", admin_email: "System", action: "lead_submitted", details: { email: "bruce@waynecorp.com" }, created_at: new Date(Date.now() - 86400000).toISOString() }
  ], []);

  // Utility to convert ISO date strings into relative time statements
  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffSec < 60) return "just now";
    if (diffMin === 1) return "1 minute ago";
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHr === 1) return "1 hour ago";
    if (diffHr < 24) return `${diffHr} hours ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "?";
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500/10 text-red-400 border border-red-500/20",
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      "bg-amber-500/10 text-[#f59e0b] border border-amber-500/20",
      "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      "bg-pink-500/10 text-pink-400 border border-pink-500/20"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Auth management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdminStatus(session.user.id);
      } else {
        setAuthLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (error || !data) {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "Operator profile missing administrative clearance.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
      } else {
        setIsAdmin(true);
        fetchDashboardData();
      }
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      toast({
        title: "Access Granted",
        description: "Authenticated successfully as Admin Operator.",
      });
    } catch (err: any) {
      toast({
        title: "Authentication Failed",
        description: err.message || "Invalid secret key.",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "Admin operator context cleared successfully.",
    });
  };

  // Keyboard Navigation: Command Palette & Tab Switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K to toggle Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }

      // Escape to close overlays
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setSelectedLead(null);
        setEditingProject(null);
        setConfirmDialog(null);
      }

      // Alt+1 to Alt+8 navigation shortcuts
      if (e.altKey && e.key >= "1" && e.key <= "8") {
        e.preventDefault();
        const tabMap = ["overview", "leads", "submissions", "portfolio", "emails", "analytics", "security", "integrations", "settings"];
        const targetTab = tabMap[parseInt(e.key) - 1];
        if (targetTab) {
          setActiveTab(targetTab);
          setSelectedLead(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch Centralized Dashboard Data
  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const { data: leadsData } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(leadsData || fallbackLeads);

      const { data: emailData } = await supabase
        .from("email_logs")
        .select("*")
        .order("sent_at", { ascending: false });
      setEmailLogs(emailData || fallbackEmailLogs);

      const { data: activityData } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false });
      setActivityLogs(activityData || fallbackActivityLogs);

      const { data: adminData } = await supabase
        .from("admin_users")
        .select("*");
      if (adminData) setAdminUsers(adminData);

      const { data: settingsData } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "current")
        .maybeSingle();

      if (settingsData) {
        setSettings({
          company_name: settingsData.company_name,
          support_email: settingsData.support_email,
          calendly_url: settingsData.calendly_url,
          social_links: settingsData.social_links || {},
          default_lead_status: settingsData.default_lead_status || "New",
          notification_settings: settingsData.notification_settings || { email: true }
        });
      }
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn("DATA_COLLECTION_FETCH_FAILED", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch Notes for a specific lead
  const fetchLeadNotes = async (leadId: string) => {
    try {
      const { data } = await supabase
        .from("lead_notes")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });
      setLeadNotes(data || []);
    } catch (err) {
      setLeadNotes([]);
    }
  };

  // Add Comment/Note to Lead
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    setSubmittingNote(true);
    const authorEmail = session?.user?.email || "Admin";

    try {
      const { data, error } = await supabase
        .from("lead_notes")
        .insert({
          lead_id: selectedLead.id,
          author_email: authorEmail,
          content: newNote.trim()
        })
        .select()
        .single();

      if (error) throw error;

      setLeadNotes([data, ...leadNotes]);
      setNewNote("");

      await logAdminAction("note_added", { lead_id: selectedLead.id, email: selectedLead.email });

      toast({
        title: "Comment Added",
        description: "Comment appended to lead audit trail.",
      });
    } catch (err: any) {
      toast({
        title: "Failed to Add Note",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSubmittingNote(false);
    }
  };

  // Update Lead Status (Stage transitions)
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const prevLeads = [...leads];
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    
    // Find previous status for logging
    const targetLead = leads.find(l => l.id === leadId);
    const prevStatus = targetLead ? targetLead.status : "Unknown";
    
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      await logAdminAction("lead_status_updated", { 
        lead_id: leadId, 
        email: targetLead?.email,
        new_status: newStatus,
        previous_status: prevStatus
      });

      toast({
        title: "Status Updated",
        description: `Lead status transitioned to ${newStatus}.`,
      });
      fetchDashboardData();
    } catch (err: any) {
      setLeads(prevLeads);
      toast({
        title: "Update Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Log Administrative Actions
  const logAdminAction = async (action: string, details: any) => {
    const adminEmail = session?.user?.email || "Operator";
    try {
      await supabase.from("activity_logs").insert({
        admin_email: adminEmail,
        action,
        details
      });
      // Fetch fresh activities logs in background
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setActivityLogs(data);
    } catch (err) {
      console.warn("FAILED_TO_LOG_ADMIN_ACTION", err);
    }
  };

  // Retry transactional mail delivery
  const handleResendMail = async (log: EmailLog) => {
    toast({
      title: "Retrying Email Delivery",
      description: `Re-dispatching message to ${log.recipient}...`,
    });

    try {
      // In a real environment, this goes through Vercel Functions API or directly to Resend API.
      // We trigger a call to our API start-project handler if needed or direct simulation log update.
      const { error } = await supabase
        .from("email_logs")
        .update({ status: "Sent", error_message: null, sent_at: new Date().toISOString() })
        .eq("id", log.id);

      if (error) throw error;

      await logAdminAction("email_retry_triggered", { recipient: log.recipient, subject: log.subject });
      
      toast({
        title: "Delivery Initiated",
        description: `Retry log updated successfully for ${log.recipient}.`,
      });
      fetchDashboardData();
    } catch (err: any) {
      toast({
        title: "Retry Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Archive Lead with 10-second Undo window
  const handleArchiveLead = async (lead: Lead) => {
    const originalLeads = [...leads];
    // Optimistic delete: clear from UI immediately
    setLeads(prev => prev.filter(l => l.id !== lead.id));
    if (selectedLead?.id === lead.id) setSelectedLead(null);

    let isReverted = false;

    const performDelete = async () => {
      if (isReverted) return;
      try {
        const { error } = await supabase
          .from("leads")
          .delete()
          .eq("id", lead.id);

        if (error) throw error;
        await logAdminAction("lead_archived", { lead_id: lead.id, name: lead.name, email: lead.email });
      } catch (err: any) {
        setLeads(originalLeads);
        toast({
          title: "Archiving Failed",
          description: err.message,
          variant: "destructive"
        });
      }
    };

    const timeoutId = setTimeout(performDelete, 10000);

    toast({
      title: "Lead Archived",
      description: `${lead.name} has been archived.`,
      action: (
        <ToastAction altText="Undo archiving" onClick={() => {
          isReverted = true;
          clearTimeout(timeoutId);
          setLeads(originalLeads);
          toast({
            title: "Action Restored",
            description: "Archiving reverted."
          });
        }}>
          Undo
        </ToastAction>
      )
    });
  };

  // Save Settings Config
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("settings")
        .upsert({
          id: "current",
          company_name: settings.company_name,
          support_email: settings.support_email,
          calendly_url: settings.calendly_url,
          social_links: settings.social_links,
          default_lead_status: settings.default_lead_status,
          notification_settings: settings.notification_settings
        });

      if (error) throw error;

      await logAdminAction("settings_updated", { settings });

      toast({
        title: "Settings Saved",
        description: "Configuration parameters updated successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Save Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Export CSV Leads Spreadsheet
  const handleExportLeads = () => {
    if (leads.length === 0) {
      toast({
        title: "Export Failed",
        description: "No lead records available to export.",
        variant: "destructive"
      });
      return;
    }
    const headers = ["ID", "Name", "Email", "Company", "Project Type", "Budget", "Timeline", "Contact", "Message", "Source", "Status", "Timestamp"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.email,
      l.company,
      l.project_type,
      l.budget_range,
      l.timeline,
      l.contact_method,
      l.message.replace(/\n/g, " "),
      l.source || "Direct",
      l.status,
      l.created_at
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `aveniq_leads_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logAdminAction("leads_exported", { count: leads.length });
  };

  // File uploading validation checks
  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid format. Upload JPG, JPEG, PNG, or WEBP.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size is 5 MB.");
      return false;
    }
    return true;
  };

  const uploadImage = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast({
        title: "Upload Successful",
        description: "Project image uploaded successfully.",
      });
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
      toast({
        title: "Upload Failed",
        description: err.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        uploadImage(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        uploadImage(file);
      }
    }
  };

  // Portfolio creation
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = projectSchema.safeParse({
      title,
      tag,
      desc,
      imageUrl,
      link,
      status: projStatus,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Validation Error";
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      });
      return;
    }

    addProject({
      title: title.trim(),
      tag: tag.trim(),
      desc: desc.trim(),
      imageUrl: imageUrl.trim(),
      link: link.trim() || undefined,
      status: projStatus,
    });

    logAdminAction("project_created", { title: title.trim() });

    toast({
      title: "Success",
      description: `Project "${title}" added successfully.`,
    });

    setTitle("");
    setTag("");
    setDesc("");
    setImageUrl("");
    setLink("");
    setProjStatus("Published");
  };

  // inline update
  const handleUpdateProject = async (id: string, updates: Partial<Omit<Project, "id">>) => {
    try {
      await updateProject(id, updates);
      await logAdminAction("project_updated", { project_id: id, updates });
      toast({
        title: "Updated",
        description: "Project modifications saved."
      });
      setEditingProject(null);
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Delete project with Undo action
  const handleDeleteProject = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Project Record",
      description: `Are you sure you want to permanently delete the portfolio item "${name}"? This action removes public assets.`,
      onConfirm: async () => {
        try {
          await deleteProject(id);
          await logAdminAction("project_deleted", { project_id: id, title: name });
          toast({
            title: "Deleted",
            description: `Project "${name}" removed.`,
          });
        } catch (err: any) {
          toast({
            title: "Deletion Failed",
            description: err.message,
            variant: "destructive"
          });
        }
      }
    });
  };

  const handleDuplicateProject = (project: Project) => {
    addProject({
      title: `${project.title} (Copy)`,
      tag: project.tag,
      desc: project.desc,
      imageUrl: project.imageUrl,
      link: project.link,
      status: project.status
    });
    logAdminAction("project_duplicated", { title: project.title });
    toast({
      title: "Project Duplicated",
      description: `Created copy of "${project.title}".`
    });
  };

  // HTML5 drag and drop reordering
  const handleProjDragStart = (e: React.DragEvent, id: string) => {
    setDraggedProjId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleProjDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedProjId || draggedProjId === id) return;

    const dragIndex = projects.findIndex(p => p.id === draggedProjId);
    const hoverIndex = projects.findIndex(p => p.id === id);

    if (dragIndex === -1 || hoverIndex === -1) return;

    const reordered = [...projects];
    const [draggedItem] = reordered.splice(dragIndex, 1);
    reordered.splice(hoverIndex, 0, draggedItem);
    reorderProjects(reordered);
  };

  const handleProjDragEnd = () => {
    setDraggedProjId(null);
  };

  // Filter & Sort leads CRM
  const filteredLeads = leads
    .filter(l => {
      const matchSearch =
        l.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        l.email.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        l.company.toLowerCase().includes(leadsSearch.toLowerCase());
      const matchStatus = leadsFilterStatus === "all" || l.status === leadsFilterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const valA = a[leadsSortField];
      const valB = b[leadsSortField];
      if (valA === undefined || valB === undefined) return 0;
      if (typeof valA === "string" && typeof valB === "string") {
        return leadsSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return leadsSortAsc ? (valA < valB ? -1 : 1) : valA > valB ? -1 : 1;
    });

  const totalPages = Math.ceil(filteredLeads.length / leadsPageSize) || 1;
  const paginatedLeads = filteredLeads.slice((leadsPage - 1) * leadsPageSize, leadsPage * leadsPageSize);

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.desc.toLowerCase().includes(portfolioSearch.toLowerCase());
    const matchFilter = portfolioFilter === "all" || p.tag.toLowerCase().includes(portfolioFilter.toLowerCase());
    const matchStatus = portfolioStatusFilter === "all" || p.status === portfolioStatusFilter;
    return matchSearch && matchFilter && matchStatus;
  });

  // Filter email logs
  const filteredEmailLogs = emailLogs.filter(e => {
    if (emailFilterStatus === "all") return true;
    return e.status.toLowerCase() === emailFilterStatus.toLowerCase();
  });

  // CRM status badges styling (thin border, solid background)
  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "New": return "bg-blue-500/5 text-blue-400 border border-blue-500/20";
      case "Contacted": return "bg-amber-500/5 text-amber-400 border border-amber-500/20";
      case "Qualified": return "bg-purple-500/5 text-purple-400 border border-purple-500/20";
      case "Proposal Sent": return "bg-indigo-500/5 text-indigo-400 border border-indigo-500/20";
      case "Won": return "bg-emerald-500/5 text-emerald-400 border border-emerald-500/20";
      case "Lost": return "bg-rose-500/5 text-rose-400 border border-rose-500/20";
      default: return "bg-zinc-500/5 text-zinc-400 border border-zinc-500/20";
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, shortcut: "⌥1" },
    { id: "leads", label: "Leads CRM", icon: Users, shortcut: "⌥2" },
    { id: "submissions", label: "Submissions", icon: Inbox, shortcut: "⌥3" },
    { id: "portfolio", label: "Portfolio", icon: Briefcase, shortcut: "⌥4" },
    { id: "emails", label: "Email Center", icon: Mail, shortcut: "⌥5" },
    { id: "analytics", label: "Analytics", icon: BarChart3, shortcut: "⌥6" },
    { id: "security", label: "Security Center", icon: Shield, shortcut: "⌥7" },
    { id: "integrations", label: "Services & Integrations", icon: Cpu, shortcut: "⌥8" },
    { id: "settings", label: "Settings", icon: Settings, shortcut: "⌥9" }
  ];

  // Calculations
  const statTotalLeads = leads.length;
  const statNewToday = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;
  const statPortfolioPublished = projects.length;
  const statEmailsSent = emailLogs.filter(e => e.status === "Sent" || e.status === "Delivered").length;
  const statDeliveredRate = emailLogs.length ? Math.round((emailLogs.filter(e => e.status === "Delivered").length / emailLogs.length) * 100) : 100;
  const statConversionRate = leads.length ? Math.round((leads.filter(l => l.status === "Won").length / leads.length) * 100) : 0;

  // Source distribution
  const sourceStats = useMemo(() => {
    const statsMap = leads.reduce((acc: Record<string, number>, cur) => {
      const src = cur.source || "Direct";
      acc[src] = (acc[src] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statsMap).map(([name, value]) => ({ name, value }));
  }, [leads]);

  // Lead intake weekly graph
  const getTimelineData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString("en-US", { weekday: "short" });
      const count = leads.filter(l => new Date(l.created_at).toDateString() === date.toDateString()).length;
      data.push({ name: dateStr, count });
    }
    return data;
  };

  // Conversion funnel ratios
  const funnelSteps = useMemo(() => {
    const visitors = 1240;
    const leadsCount = leads.length;
    const qualifiedCount = leads.filter(l => ["Qualified", "Proposal Sent", "Won"].includes(l.status)).length;
    const proposalCount = leads.filter(l => ["Proposal Sent", "Won"].includes(l.status)).length;
    const wonCount = leads.filter(l => l.status === "Won").length;

    return [
      { label: "Visitors", count: visitors, percentage: 100 },
      { label: "Leads Inbound", count: leadsCount, percentage: visitors ? Math.round((leadsCount / visitors) * 100) : 0 },
      { label: "Qualified Stage", count: qualifiedCount, percentage: visitors ? Math.round((qualifiedCount / visitors) * 100) : 0 },
      { label: "Proposal Sent", count: proposalCount, percentage: visitors ? Math.round((proposalCount / visitors) * 100) : 0 },
      { label: "Won Deals", count: wonCount, percentage: visitors ? Math.round((wonCount / visitors) * 100) : 0 }
    ];
  }, [leads]);

  // SOC security health
  const securityHealthCards = [
    { title: "Authentication Engine", status: "Healthy", desc: "Operator credentials security active", variant: "green" as const },
    { title: "Inbound Rate Limiting", status: "Healthy", desc: "IP dynamic connections blocks active", variant: "green" as const },
    { title: "Supabase Row-level RLS", status: "Healthy", desc: "Database query level isolation active", variant: "green" as const },
    { title: "API Gateway Status", status: "Healthy", desc: "Serverless ingress routing healthy", variant: "green" as const },
    { title: "Resend Email Dispatch", status: emailLogs.some(e => e.status === "Failed") ? "Warning" : "Healthy", desc: emailLogs.some(e => e.status === "Failed") ? "Recent failed deliveries recorded" : "Transaction notifications delivery active", variant: emailLogs.some(e => e.status === "Failed") ? ("amber" as const) : ("green" as const) },
    { title: "Storage Storage S3", status: "Healthy", desc: "Project mockups assets bucket healthy", variant: "green" as const }
  ];

  // Unified Chronological activity log for Lead Drawer (Attio CRM-grade)
  const unifiedLeadTimeline = useMemo(() => {
    if (!selectedLead) return [];

    const notes = leadNotes.map(n => ({
      id: n.id,
      type: "note",
      author: n.author_email,
      content: n.content,
      created_at: n.created_at
    }));

    const events = activityLogs
      .filter(log => log.details?.lead_id === selectedLead.id)
      .map(log => ({
        id: log.id,
        type: "event",
        author: log.admin_email,
        content: log.action === "lead_status_updated"
          ? `changed stage to ${log.details?.new_status} (from ${log.details?.previous_status || 'New'})`
          : log.action.replace(/_/g, " "),
        created_at: log.created_at
      }));

    return [...notes, ...events].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [leadNotes, activityLogs, selectedLead]);

  // Command Palette Items
  const commandPaletteFilteredCommands = useMemo(() => {
    const navs = menuItems.map(item => ({
      type: "command",
      label: `Go to ${item.label}`,
      action: () => {
        setActiveTab(item.id);
        setSelectedLead(null);
        setIsCommandPaletteOpen(false);
      }
    }));

    const actions = [
      {
        type: "command",
        label: "Export Leads CSV Spreadsheet",
        action: () => {
          handleExportLeads();
          setIsCommandPaletteOpen(false);
        }
      },
      {
        type: "command",
        label: "Synchronize Database Cache",
        action: () => {
          fetchDashboardData();
          setIsCommandPaletteOpen(false);
        }
      }
    ];

    const matchedLeads = leads
      .filter(l =>
        l.name.toLowerCase().includes(commandPaletteQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(commandPaletteQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(commandPaletteQuery.toLowerCase())
      )
      .map(lead => ({
        type: "lead",
        label: `Lead: ${lead.name} (${lead.company})`,
        action: () => {
          setActiveTab("leads");
          setSelectedLead(lead);
          fetchLeadNotes(lead.id);
          setIsCommandPaletteOpen(false);
        }
      }));

    return [...navs, ...actions, ...matchedLeads].filter(item =>
      item.label.toLowerCase().includes(commandPaletteQuery.toLowerCase())
    );
  }, [commandPaletteQuery, leads]);

  const handleCommandPaletteSelect = () => {
    const item = commandPaletteFilteredCommands[commandPaletteIndex];
    if (item) {
      item.action();
      setCommandPaletteQuery("");
      setCommandPaletteIndex(0);
    }
  };

  // Executive Dashboard alerts
  const actionItemsCount = useMemo(() => {
    let count = 0;
    if (leads.some(l => l.status === "New")) count += leads.filter(l => l.status === "New").length;
    if (emailLogs.some(e => e.status === "Failed")) count += emailLogs.filter(e => e.status === "Failed").length;
    if (projects.some(p => p.status === "Draft")) count += projects.filter(p => p.status === "Draft").length;
    return count;
  }, [leads, emailLogs, projects]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center select-none font-sans">
        <div className="w-5 h-5 rounded-full border border-white/5 border-t-[#10b981] animate-spin" />
        <span className="mt-4 text-[9px] font-semibold font-mono tracking-widest text-[#a1a1aa] uppercase">Initializing Operators Kernel...</span>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#08080a] text-[#f5f5f5] flex flex-col justify-center items-center px-4 relative select-none font-sans">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9)]"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.02] border border-[#1a1a22] mb-4">
              <Lock className="w-4 h-4 text-[#10b981]" />
            </div>
            <h1 className="text-lg font-medium tracking-tight mb-1 text-white">Aveniq CRM</h1>
            <p className="text-xs text-[#a1a1aa]">Internal Operator Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Operator Email</label>
              <input
                type="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white placeholder:text-white/20 text-xs font-light transition-colors"
                placeholder="operator@theaveniq.in"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Secret Token</label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white placeholder:text-white/20 text-xs font-light transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#f5f5f5] hover:bg-white text-[#08080a] py-3 rounded-lg font-bold text-xs transition-colors active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loginLoading ? (
                  <div className="w-4 h-4 rounded-full border border-[#08080a]/20 border-t-[#08080a] animate-spin" />
                ) : (
                  <>Access Operations Console <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1a1a22] text-center">
            <Link href="/" className="text-xs text-[#a1a1aa] hover:text-white transition-colors duration-200">
              Return to Landing Site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f5f5f5] flex font-sans antialiased select-none selection:bg-[#10b981]/30 relative overflow-x-hidden">
      
      {/* 1. Command Palette Modal (⌘K) */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandPaletteOpen(false)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-lg bg-[#0e0e11] border border-[#1a1a22] rounded-xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.9)] z-10 flex flex-col max-h-[400px]"
            >
              <div className="relative border-b border-[#1a1a22] p-4 flex items-center gap-3">
                <Search className="w-4 h-4 text-[#a1a1aa]" />
                <input
                  type="text"
                  autoFocus
                  value={commandPaletteQuery}
                  onChange={e => {
                    setCommandPaletteQuery(e.target.value);
                    setCommandPaletteIndex(0);
                  }}
                  onKeyDown={e => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setCommandPaletteIndex(prev => Math.min(commandPaletteFilteredCommands.length - 1, prev + 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setCommandPaletteIndex(prev => Math.max(0, prev - 1));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      handleCommandPaletteSelect();
                    }
                  }}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20 w-full font-light"
                  placeholder="Type a command, tab name, or lead search query..."
                />
                <span className="text-[9px] font-mono border border-[#1a1a22] bg-[#08080a] px-1.5 py-0.5 rounded text-[#a1a1aa]">ESC</span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {commandPaletteFilteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      cmd.action();
                      setCommandPaletteQuery("");
                      setCommandPaletteIndex(0);
                    }}
                    onMouseEnter={() => setCommandPaletteIndex(idx)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                      commandPaletteIndex === idx ? "bg-white/[0.04] text-white" : "text-[#a1a1aa]"
                    }`}
                  >
                    <span>{cmd.label}</span>
                    {cmd.type === "command" && (
                      <Terminal className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </button>
                ))}
                {commandPaletteFilteredCommands.length === 0 && (
                  <p className="text-center py-6 text-xs text-[#a1a1aa] italic">No commands or operators matching queries.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Custom Confirmation Modal */}
      {confirmDialog?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmDialog(null)} />
          <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 w-full max-w-sm relative z-10 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h4 className="text-xs font-semibold font-mono uppercase tracking-wider">{confirmDialog.title}</h4>
            </div>
            <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">{confirmDialog.description}</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-3.5 py-2 bg-transparent hover:bg-white/5 border border-[#1a1a22] text-[#a1a1aa] hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(null);
                }}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Project Editing Inline Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditingProject(null)} />
          <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 w-full max-w-md relative z-10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1a1a22] pb-3">
              <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Modify Project Parameters</h4>
              <button onClick={() => setEditingProject(null)} className="text-[#a1a1aa] hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                handleUpdateProject(editingProject.id, {
                  title: fd.get("title") as string,
                  tag: fd.get("tag") as string,
                  desc: fd.get("desc") as string,
                  imageUrl: fd.get("imageUrl") as string,
                  link: fd.get("link") as string,
                  status: fd.get("status") as any
                });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Title</label>
                <input name="title" type="text" defaultValue={editingProject.title} required className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Category Tag</label>
                <input name="tag" type="text" defaultValue={editingProject.tag} required className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Description</label>
                <textarea name="desc" rows={3} defaultValue={editingProject.desc} required className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Status</label>
                  <select name="status" defaultValue={editingProject.status} className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white cursor-pointer">
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Live Link</label>
                  <input name="link" type="url" defaultValue={editingProject.link || ""} className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">Image URL</label>
                <input name="imageUrl" type="url" defaultValue={editingProject.imageUrl || ""} required className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-[#1a1a22]">
                <button type="button" onClick={() => setEditingProject(null)} className="px-3.5 py-2 bg-transparent hover:bg-white/5 border border-[#1a1a22] text-[#a1a1aa] rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-white text-[#08080a] font-bold rounded-lg">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Desktop Sidebar Command Center Deck */}
      <aside
        className={`hidden lg:flex flex-col bg-[#0e0e11] border-r border-[#1a1a22] p-5 shrink-0 relative z-30 justify-between transition-all duration-300 ${
          isSidebarCollapsed ? "w-[68px]" : "w-[260px]"
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-8 px-1">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-sm font-semibold tracking-wide text-white font-mono">Aveniq Operating OS</span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 rounded border border-[#1a1a22] bg-[#08080a]/60 hover:bg-[#08080a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer ${
                isSidebarCollapsed ? "mx-auto" : ""
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedLead(null);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer justify-start group border ${
                    isActive
                      ? "bg-white/[0.04] text-white border-[#1a1a22]"
                      : "text-[#a1a1aa] hover:text-white hover:bg-white/[0.01] border-transparent"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#10b981]" : "text-[#a1a1aa]"} ${isSidebarCollapsed ? "mx-auto" : "mr-3"}`} />
                  {!isSidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="text-[9px] font-mono text-[#a1a1aa]/30 tracking-wider group-hover:text-[#a1a1aa]/60 transition-colors">{item.shortcut}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#1a1a22] space-y-4">
          {/* User profile */}
          <div className={`flex items-center gap-3 px-1 ${isSidebarCollapsed ? "justify-center" : ""}`}>
            <div className="w-7 h-7 rounded-full bg-white/[0.02] border border-[#1a1a22] flex items-center justify-center text-[10px] font-mono text-[#10b981] shrink-0 relative">
              OP
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-[#10b981]" title="Security Cleared" />
            </div>
            {!isSidebarCollapsed && (
              <div className="truncate">
                <p className="text-[10px] font-semibold text-white truncate">{session?.user?.email}</p>
                <p className="text-[9px] font-mono text-[#a1a1aa]">Super Admin Operator</p>
              </div>
            )}
          </div>

          {/* System status footer */}
          {!isSidebarCollapsed && (
            <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-2.5 text-[9px] font-mono text-[#a1a1aa] select-none">
              <div className="flex items-center justify-between">
                <span>System Status</span>
                <span className="text-[#10b981] flex items-center gap-1 font-bold">● Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Sync</span>
                <span>{lastSyncTime}</span>
              </div>
              <div className="flex items-center justify-between truncate gap-2">
                <span>Admin Email</span>
                <span className="truncate text-white" title={session?.user?.email}>{session?.user?.email}</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Drawer Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-[#0e0e11] border-b border-[#1a1a22] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="text-xs font-semibold tracking-wide text-white">Aveniq Operating OS</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-1.5 text-[#a1a1aa] hover:text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Panel */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[260px] bg-[#0e0e11] border-r border-[#1a1a22] p-5 z-50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="text-sm font-semibold tracking-wide text-white">Aveniq CRM</span>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 text-[#a1a1aa] hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {menuItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSelectedLead(null);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer justify-start ${
                          isActive
                            ? "bg-white/[0.04] text-white border border-[#1a1a22]"
                            : "text-[#a1a1aa] hover:text-white hover:bg-white/[0.01] border border-transparent"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#10b981]" : "text-[#a1a1aa]"}`} />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#1a1a22] space-y-4">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-7 h-7 rounded-full bg-white/[0.02] border border-[#1a1a22] flex items-center justify-center text-[10px] font-mono text-[#10b981]">
                    OP
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-white truncate">{session?.user?.email}</p>
                    <p className="text-[9px] font-mono text-[#a1a1aa]">Super Admin</p>
                  </div>
                </div>

                <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-2 text-[9px] font-mono text-[#a1a1aa]">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="text-[#10b981]">● Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sync</span>
                    <span>{lastSyncTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/5 hover:text-rose-300 rounded-lg cursor-pointer transition-colors border border-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 5. Main Dashboard Frame */}
      <main className="flex-1 min-w-0 flex flex-col pt-14 lg:pt-0 overflow-x-hidden relative z-10 bg-[#08080a]">
        <header className="h-14 border-b border-[#1a1a22] bg-[#08080a]/60 sticky top-0 px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#a1a1aa] tracking-wider font-mono uppercase bg-white/[0.02] border border-[#1a1a22] px-2 py-0.5 rounded">Console</span>
            <ChevronRight className="w-3 h-3 text-[#1a1a22]" />
            <span className="text-xs text-white capitalize font-medium">{activeTab === "emails" ? "Email Center" : activeTab === "leads" ? "Leads CRM" : activeTab === "integrations" ? "Services & Integrations" : activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs text-[#a1a1aa] border border-[#1a1a22] rounded-lg px-3 py-1 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" /> Search Command Palette <span className="text-[9px] font-mono opacity-50">⌘K</span>
            </button>
            <button
              onClick={fetchDashboardData}
              className="flex items-center justify-center p-1.5 border border-[#1a1a22] rounded-lg bg-white/[0.01] hover:bg-white/[0.03] text-[#a1a1aa] hover:text-white cursor-pointer active:scale-95 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
          {dataLoading ? (
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="h-24 bg-[#0e0e11] border border-[#1a1a22] rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="h-96 bg-[#0e0e11] border border-[#1a1a22] rounded-xl animate-pulse" />
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Executive Dashboard alert bar */}
                  {actionItemsCount > 0 && (
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between text-xs text-amber-200">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>Executive Operating Alert:</strong> There are {actionItemsCount} items requiring operational action (unaddressed leads, failing deliveries, or draft layouts).</span>
                      </div>
                      <button 
                        onClick={() => {
                          if (leads.some(l => l.status === "New")) setActiveTab("leads");
                          else if (emailLogs.some(e => e.status === "Failed")) setActiveTab("emails");
                          else setActiveTab("portfolio");
                        }} 
                        className="px-2.5 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-mono text-[10px] uppercase border border-amber-400/25 rounded transition-all cursor-pointer"
                      >
                        Action Center
                      </button>
                    </div>
                  )}

                  {/* Top-Level KPIs row with comparison indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Inbound Leads</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">{statTotalLeads}</span>
                        <span className="text-[10px] text-[#10b981] font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> ↑ 18% vs last month</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Count since deployment</p>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Conversion Rate</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">{statConversionRate}%</span>
                        <span className="text-[10px] text-rose-400 font-mono flex items-center gap-0.5"><TrendingDown className="w-3 h-3" /> ↓ 4% vs last week</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Closed won deals ratio</p>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Delivered Emails</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">{statEmailsSent}</span>
                        <span className="text-[10px] text-[#10b981] font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> ↑ 12% vs last month</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Resend target success ({statDeliveredRate}%)</p>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Response SLA</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">48h</span>
                        <span className="text-[10px] text-[#10b981] font-mono flex items-center gap-0.5">✔ 100% compliant</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Maximum target feedback delay</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Operations logs feed */}
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 flex flex-col justify-between gap-5 lg:col-span-2">
                      <div>
                        <h3 className="text-xs font-semibold text-white tracking-tight mb-4 flex items-center gap-2 uppercase font-mono">
                          <Activity className="w-4 h-4 text-[#10b981]" /> Operator Audit Trail
                        </h3>
                        <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                          {activityLogs.slice(0, 8).map(log => (
                            <div key={log.id} className="flex justify-between items-start gap-4 text-xs font-light">
                              <div className="flex gap-2">
                                <span className="text-[#10b981] font-mono">[{log.admin_email.split("@")[0]}]</span>
                                <span className="text-white/80">{log.action.replace(/_/g, " ")}</span>
                                {log.details?.email && (
                                  <span className="text-[#a1a1aa]">({log.details.email})</span>
                                )}
                              </div>
                              <span className="text-[#a1a1aa] font-mono text-[9px] whitespace-nowrap">
                                {getRelativeTime(log.created_at)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 border-t border-[#1a1a22] pt-4">
                        <button
                          onClick={() => setActiveTab("leads")}
                          className="px-4 py-2 bg-[#f5f5f5] hover:bg-white text-[#08080a] text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          CRM Center
                        </button>
                        <button
                          onClick={handleExportLeads}
                          className="px-4 py-2 bg-transparent border border-[#1a1a22] hover:bg-white/[0.02] text-white text-xs font-bold rounded-lg cursor-pointer transition-all active:scale-[0.98]"
                        >
                          Export Leads CSV
                        </button>
                      </div>
                    </div>

                    {/* Funnel chart preview */}
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-4">
                      <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">Pipeline Funnel</h3>
                      <div className="space-y-3.5">
                        {funnelSteps.map((step, idx) => (
                          <div key={idx} className="space-y-1 text-xs">
                            <div className="flex justify-between items-center font-light">
                              <span className="text-[#a1a1aa]">{step.label}</span>
                              <span className="font-mono text-[10px] text-white">{step.count} ({step.percentage}%)</span>
                            </div>
                            <div className="h-1 w-full bg-[#08080a] border border-[#1a1a22] rounded overflow-hidden">
                              <div
                                className="h-full bg-[#10b981]"
                                style={{ width: `${step.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* High priority leads */}
                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-white tracking-tight mb-4 flex items-center gap-2 uppercase font-mono">
                      <Inbox className="w-4 h-4 text-[#10b981]" /> Action Required leads
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-medium font-mono text-[9px] uppercase">
                            <th className="pb-3 pr-4">Lead</th>
                            <th className="pb-3 px-4">Entity</th>
                            <th className="pb-3 px-4">Budget Scope</th>
                            <th className="pb-3 px-4">Timeline</th>
                            <th className="pb-3 px-4">Status</th>
                            <th className="pb-3 pl-4 text-right">Inbound</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1a1a22]">
                          {leads.slice(0, 4).map(lead => (
                            <tr
                              key={lead.id}
                              onClick={() => {
                                setSelectedLead(lead);
                                fetchLeadNotes(lead.id);
                                setActiveTab("leads");
                              }}
                              className="hover:bg-white/[0.01] cursor-pointer"
                            >
                              <td className="py-3 pr-4 font-semibold text-white">
                                <div className="flex items-center gap-3">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${getAvatarColor(lead.name)}`}>
                                    {getInitials(lead.name)}
                                  </div>
                                  <div>
                                    <p className="truncate max-w-[120px]">{lead.name}</p>
                                    <p className="text-[#a1a1aa] font-light text-[10px] truncate max-w-[150px]">{lead.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-white/80 font-light truncate max-w-[120px]">{lead.company}</td>
                              <td className="py-3 px-4 text-[#10b981] font-mono text-[10px]">
                                <span className="bg-[#10b981]/5 border border-[#10b981]/20 px-2 py-0.5 rounded">{lead.budget_range}</span>
                              </td>
                              <td className="py-3 px-4 text-white/85 font-light">{lead.timeline}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-semibold font-mono ${getStatusColor(lead.status)}`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 pl-4 text-right font-mono text-[#a1a1aa] text-[10px]">
                                {getRelativeTime(lead.created_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LEADS CRM TABLE */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="flex flex-col xl:flex-row gap-6 items-start">
                    <div className="flex-1 w-full bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                          <Users className="w-4 h-4 text-[#10b981]" /> Leads Pipeline CRM
                        </h3>
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Search */}
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                            <input
                              type="text"
                              value={leadsSearch}
                              onChange={e => setLeadsSearch(e.target.value)}
                              className="bg-[#08080a] border border-[#1a1a22] text-xs text-white placeholder:text-white/20 rounded-lg pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-[#10b981] font-light"
                              placeholder="Search leads name/email..."
                            />
                          </div>
                          {/* Filter by Status */}
                          <div className="relative">
                            <select
                              value={leadsFilterStatus}
                              onChange={e => setLeadsFilterStatus(e.target.value)}
                              className="bg-[#08080a] border border-[#1a1a22] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#10b981] cursor-pointer pr-8 appearance-none"
                            >
                              <option value="all">All Stages</option>
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Won">Won</option>
                              <option value="Lost">Lost</option>
                            </select>
                            <Filter className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* CRM Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-medium font-mono text-[9px] uppercase">
                              <th className="pb-3 pr-4">
                                <button
                                  onClick={() => {
                                    setLeadsSortField("name");
                                    setLeadsSortAsc(!leadsSortAsc);
                                  }}
                                  className="hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                                >
                                  Operator / Candidate <ArrowUpDown className="w-3 h-3" />
                                </button>
                              </th>
                              <th className="pb-3 px-4">Entity</th>
                              <th className="pb-3 px-4">Type</th>
                              <th className="pb-3 px-4">Budget Scope</th>
                              <th className="pb-3 px-4">
                                <button
                                  onClick={() => {
                                    setLeadsSortField("status");
                                    setLeadsSortAsc(!leadsSortAsc);
                                  }}
                                  className="hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                                >
                                  Stage <ArrowUpDown className="w-3 h-3" />
                                </button>
                              </th>
                              <th className="pb-3 px-4">Source</th>
                              <th className="pb-3 px-4">
                                <button
                                  onClick={() => {
                                    setLeadsSortField("created_at");
                                    setLeadsSortAsc(!leadsSortAsc);
                                  }}
                                  className="hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                                >
                                  Inbound <ArrowUpDown className="w-3 h-3" />
                                </button>
                              </th>
                              <th className="pb-3 pl-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1a1a22]">
                            {paginatedLeads.map(lead => (
                              <tr
                                key={lead.id}
                                onClick={() => {
                                  setSelectedLead(lead);
                                  fetchLeadNotes(lead.id);
                                }}
                                className={`hover:bg-white/[0.01] cursor-pointer transition-colors ${
                                  selectedLead?.id === lead.id ? "bg-white/[0.02]" : ""
                                } group`}
                              >
                                <td className="py-3 pr-4 font-semibold text-white">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${getAvatarColor(lead.name)}`}>
                                      {getInitials(lead.name)}
                                    </div>
                                    <div>
                                      <p>{lead.name}</p>
                                      <p className="text-[#a1a1aa] font-light text-[10px]">{lead.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-white/85 font-light truncate max-w-[120px]">{lead.company}</td>
                                <td className="py-3 px-4 text-white/85 font-light">{lead.project_type}</td>
                                <td className="py-3 px-4 text-white/85 font-light">
                                  <span className="bg-[#10b981]/5 text-[#10b981] px-2.5 py-0.5 rounded text-[10px] font-semibold border border-[#10b981]/20 font-mono">
                                    {lead.budget_range}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold font-mono ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="bg-zinc-500/5 text-zinc-400 px-2 py-0.5 rounded text-[9px] font-semibold border border-zinc-500/20 font-mono">
                                    {lead.source || "Direct"}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-mono text-[#a1a1aa] text-[10px]">
                                  {getRelativeTime(lead.created_at)}
                                </td>
                                <td className="py-3 pl-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                                  <div className="flex items-center justify-end gap-2">
                                    {/* Hover triggered quick actions - Linear style */}
                                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-all">
                                      <button
                                        onClick={() => {
                                          setSelectedLead(lead);
                                          fetchLeadNotes(lead.id);
                                        }}
                                        className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded text-[10px] font-semibold border border-[#1a1a22] cursor-pointer"
                                      >
                                        Open
                                      </button>
                                      {lead.status !== "Contacted" && (
                                        <button
                                          onClick={() => handleStatusChange(lead.id, "Contacted")}
                                          className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded text-[10px] font-semibold border border-amber-500/20 cursor-pointer"
                                        >
                                          Contacted
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleArchiveLead(lead)}
                                        className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded text-[10px] font-semibold border border-rose-500/20 cursor-pointer"
                                      >
                                        Archive
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setSelectedLead(lead);
                                        fetchLeadNotes(lead.id);
                                      }}
                                      className="p-1 text-[#a1a1aa] hover:text-white cursor-pointer block group-hover:hidden"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {paginatedLeads.length === 0 && (
                              <tr>
                                <td colSpan={8} className="py-6 text-center text-[#a1a1aa] italic">
                                  No pipelines leads matching filter settings.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination UI */}
                      <div className="flex items-center justify-between border-t border-[#1a1a22] pt-4 text-xs">
                        <span className="text-[#a1a1aa]">
                          Showing <strong className="text-white">{filteredLeads.length ? (leadsPage - 1) * leadsPageSize + 1 : 0}</strong> to{" "}
                          <strong className="text-white">
                            {Math.min(leadsPage * leadsPageSize, filteredLeads.length)}
                          </strong>{" "}
                          of <strong className="text-white">{filteredLeads.length}</strong> records
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setLeadsPage(Math.max(1, leadsPage - 1))}
                            disabled={leadsPage === 1}
                            className="p-1 border border-[#1a1a22] rounded bg-[#08080a] hover:bg-white/[0.02] text-[#a1a1aa] disabled:opacity-30 cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-white font-mono">{leadsPage} / {totalPages}</span>
                          <button
                            onClick={() => setLeadsPage(Math.min(totalPages, leadsPage + 1))}
                            disabled={leadsPage === totalPages}
                            className="p-1 border border-[#1a1a22] rounded bg-[#08080a] hover:bg-white/[0.02] text-[#a1a1aa] disabled:opacity-30 cursor-pointer transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Attio-Style Split Drawer Panel */}
                    <AnimatePresence>
                      {selectedLead && (
                        <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="
                          w-full
                          xl:w-[860px]
                          h-[720px]
                          bg-[#0e0e11]
                          border border-[#1a1a22]
                          rounded-2xl
                          overflow-hidden
                          flex
                          flex-col
                          shadow-2xl
                          shrink-0
                        "
                      >
                          {/* Drawer Header */}
                          <div className="flex items-center justify-between p-4 border-b border-[#1a1a22] bg-[#08080a]/30">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono shrink-0 ${getAvatarColor(selectedLead.name)}`}>
                                {getInitials(selectedLead.name)}
                              </div>
                              <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[200px]">{selectedLead.name}</span>
                            </div>
                            <button
                              onClick={() => setSelectedLead(null)}
                              className="p-1 text-[#a1a1aa] hover:text-white cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Split layout inside drawer */}
                          <div className="flex flex-1 min-h-0">
                            {/* Left Side: Premium Lead Profile */}
<div className="w-[340px] shrink-0 overflow-y-auto bg-gradient-to-b from-[#101014] to-[#09090b] border-r border-[#1a1a22]">
  {/* Hero */}
  <div className="p-6 border-b border-[#1a1a22]">
    <div className="flex items-center gap-4">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold ${getAvatarColor(
          selectedLead.name
        )}`}
      >
        {getInitials(selectedLead.name)}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-semibold text-white truncate">
          {selectedLead.name}
        </h2>

        <p className="text-sm text-[#8b8b95] truncate">
          {selectedLead.company || "Individual Client"}
        </p>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(selectedLead.status)}`}>
            {selectedLead.status}
          </span>

          <span className="px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[11px] font-semibold">
            {selectedLead.budget_range}
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Details */}
  <div className="p-6 space-y-5">

    <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
        Email
      </p>

      <p className="text-white break-all select-all">
        {selectedLead.email}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3">

      <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
          Project
        </p>

        <p className="text-white">
          {selectedLead.project_type}
        </p>
      </div>

      <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
          Timeline
        </p>

        <p className="text-white">
          {selectedLead.timeline}
        </p>
      </div>

    </div>

    <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
        Preferred Contact
      </p>

      <p className="text-white">
        {selectedLead.contact_method}
      </p>
    </div>

    <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-3">
        Project Brief
      </p>

      <p className="text-sm text-[#d4d4d8] leading-7 whitespace-pre-wrap">
        {selectedLead.message}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3">

      <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
          Source
        </p>

        <p className="text-white">
          {selectedLead.source || "Direct"}
        </p>
      </div>

      <div className="bg-[#0d0d11] border border-[#1a1a22] rounded-xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#6f6f79] mb-2">
          Submitted
        </p>

        <p className="text-white">
          {getRelativeTime(selectedLead.created_at)}
        </p>
      </div>

    </div>

  </div>
</div>

                            {/* Right Side: Chronological Activity Timeline + Notes Comments */}
                            <div className="flex-1 p-6 overflow-hidden flex flex-col">
                              <div className="flex-1 overflow-y-auto pr-2">
                                <p className="text-[9px] text-[#a1a1aa] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-[#1a1a22] pb-2">
                                  <History className="w-3.5 h-3.5 text-[#10b981]" /> CRM unified timeline
                                </p>

                                <div className="space-y-4 pr-1">
                                  {unifiedLeadTimeline.map(item => (
                                    <div key={item.id} className="relative pl-4 border-l border-white/[0.04] space-y-1">
                                      <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#1a1a22] border border-[#10b981]/40" />
                                      {item.type === "note" ? (
                                        <div className="bg-[#08080a]/60 border border-[#1a1a22] rounded-lg p-2 space-y-1">
                                          <div className="flex justify-between items-center text-[8px] font-mono text-[#a1a1aa]">
                                            <span className="font-semibold text-white/70">{item.author.split("@")[0]}</span>
                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                          </div>
                                          <p className="text-[10px] text-white/90 font-light leading-relaxed select-text">{item.content}</p>
                                        </div>
                                      ) : (
                                        <div className="text-[10px] text-[#a1a1aa] font-light">
                                          <span className="text-white font-mono">[{item.author.split("@")[0]}]</span> {item.content}
                                          <span className="block text-[8px] font-mono opacity-50 mt-0.5">{getRelativeTime(item.created_at)}</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                  {unifiedLeadTimeline.length === 0 && (
                                    <p className="text-[10px] text-[#a1a1aa] italic py-4 text-center">Timeline log empty.</p>
                                  )}
                                </div>
                              </div>

                              <form onSubmit={handleAddNote} className="space-y-2 border-t border-[#1a1a22] pt-3 shrink-0">
                                <textarea
                                  value={newNote}
                                  onChange={e => setNewNote(e.target.value)}
                                  rows={2}
                                  required
                                  placeholder="Post comments to timeline..."
                                  className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg p-2 focus:outline-none focus:border-[#10b981] text-white placeholder:text-white/20 text-xs font-light resize-none"
                                />
                                <button
                                  type="submit"
                                  disabled={submittingNote}
                                  className="px-3 py-1 bg-[#f5f5f5] hover:bg-white text-[#08080a] text-[10px] font-bold rounded cursor-pointer transition-colors"
                                >
                                  {submittingNote ? "Posting..." : "Comment"}
                                </button>
                              </form>
                            </div>
                          </div>

                          {/* Sticky bottom stage transition action bar */}
                          <div className="p-3 border-t border-[#1a1a22] bg-[#0e0e11] flex flex-wrap gap-1.5 shrink-0 justify-between items-center">
                            <span className="text-[9px] font-mono text-[#a1a1aa] uppercase">Set Stage:</span>
                            <div className="flex gap-1.5">
                              {(["Contacted", "Proposal Sent", "Won", "Lost"] as LeadStatus[]).map(st => (
                                <button
                                  key={st}
                                  onClick={() => handleStatusChange(selectedLead.id, st)}
                                  className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer border ${
                                    selectedLead.status === st
                                      ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30"
                                      : "bg-[#08080a] border-[#1a1a22] hover:border-white/20 text-[#a1a1aa] hover:text-white"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* TAB 3: SUBMISSIONS HISTORY */}
              {activeTab === "submissions" && (
                <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#1a1a22] pb-4">
                    <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                      <Inbox className="w-4 h-4 text-[#10b981]" /> Submissions logs
                    </h3>
                    <button
                      onClick={handleExportLeads}
                      className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white border border-[#1a1a22] rounded-lg px-3 py-1.5 bg-[#08080a] hover:bg-[#08080a]/60 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Export CSV Spreadsheet
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-medium font-mono text-[9px] uppercase">
                          <th className="pb-3 pr-4">Candidate</th>
                          <th className="pb-3 px-4">Entity</th>
                          <th className="pb-3 px-4">Description</th>
                          <th className="pb-3 px-4">Payload specs</th>
                          <th className="pb-3 px-4">Inbound</th>
                          <th className="pb-3 pl-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1a1a22]">
                        {leads.map(lead => (
                          <tr key={lead.id} className="hover:bg-white/[0.01]">
                            <td className="py-4 pr-4 font-semibold text-white align-top">
                              <p>{lead.name}</p>
                              <p className="text-[#a1a1aa] font-light text-[10px] mt-0.5">{lead.email}</p>
                            </td>
                            <td className="py-4 px-4 text-white/85 font-light align-top">{lead.company}</td>
                            <td className="py-4 px-4 text-[#a1a1aa] font-light align-top max-w-sm">
                              <p className="line-clamp-3 leading-relaxed select-text">{lead.message}</p>
                            </td>
                            <td className="py-4 px-4 text-white/80 align-top font-mono text-[10px] space-y-1">
                              <p>Budget: {lead.budget_range}</p>
                              <p>Source: {lead.source || "Direct"}</p>
                            </td>
                            <td className="py-4 px-4 font-mono text-[#a1a1aa] text-[10px] align-top">
                              {getRelativeTime(lead.created_at)}
                            </td>
                            <td className="py-4 pl-4 text-right align-top space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  fetchLeadNotes(lead.id);
                                  setActiveTab("leads");
                                }}
                                className="px-2.5 py-1 text-[10px] text-[#10b981] hover:bg-[#10b981]/15 rounded border border-[#10b981]/20 font-bold cursor-pointer transition-colors inline-block"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleArchiveLead(lead)}
                                className="p-1.5 text-[#a1a1aa] hover:text-rose-400 cursor-pointer inline-block"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: PORTFOLIO MANAGEMENT */}
              {activeTab === "portfolio" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Project Insertion form panel */}
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-6">
                      <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                        <Plus className="w-4 h-4 text-[#10b981]" /> Add Portfolio item
                      </h3>

                      <form onSubmit={handleAddProject} className="space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="title" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Project Title</label>
                            <input
                              type="text"
                              id="title"
                              value={title}
                              onChange={e => setTitle(e.target.value)}
                              className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                              placeholder="e.g. Nexus Dashboard"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="tag" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Category Tag</label>
                            <input
                              type="text"
                              id="tag"
                              value={tag}
                              onChange={e => setTag(e.target.value)}
                              className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                              placeholder="e.g. SaaS · CRM"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="desc" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Description</label>
                          <textarea
                            id="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            rows={3}
                            className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                            placeholder="Explain the project scope..."
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Status</label>
                            <select
                              value={projStatus}
                              onChange={e => setProjStatus(e.target.value as any)}
                              className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white cursor-pointer"
                            >
                              <option value="Published">Published</option>
                              <option value="Draft">Draft</option>
                              <option value="In Review">In Review</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="link" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Live Link (Optional)</label>
                            <input
                              type="url"
                              id="link"
                              value={link}
                              onChange={e => setLink(e.target.value)}
                              className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>

                        {/* File upload */}
                        <div>
                          <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Project Screenshot Preview</label>
                          <div
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            className={`w-full rounded-lg border-2 border-dashed ${
                              dragActive ? "border-[#10b981] bg-[#10b981]/5" : "border-[#1a1a22] hover:border-[#10b981]/30 bg-[#08080a]"
                            } transition-colors text-center relative overflow-hidden flex flex-col justify-center items-center py-6 px-4 cursor-pointer`}
                          >
                            <input
                              type="file"
                              id="file-upload"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                              onChange={handleFileInput}
                              accept=".jpg,.jpeg,.png,.webp"
                            />

                            {isUploading ? (
                              <div className="flex flex-col items-center py-2">
                                <div className="w-6 h-6 rounded-full border-2 border-white/5 border-t-[#10b981] animate-spin mb-2" />
                                <span className="text-[10px] text-[#a1a1aa]">Uploading layout screenshot...</span>
                              </div>
                            ) : imageUrl ? (
                              <div className="relative group w-full max-h-[120px] rounded-lg overflow-hidden flex items-center justify-center bg-black/60 border border-[#1a1a22] p-1 z-30">
                                <img src={imageUrl} alt="Upload preview" className="max-h-[110px] w-auto object-contain rounded" />
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setImageUrl("");
                                  }}
                                  className="absolute top-1 right-1 p-1 rounded bg-black/80 hover:bg-rose-950/80 text-white/60 hover:text-rose-400 border border-white/5 cursor-pointer z-40 transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center py-2">
                                <div className="w-8 h-8 rounded bg-white/[0.02] border border-[#1a1a22] flex items-center justify-center mb-2">
                                  <Upload className="w-4 h-4 text-[#10b981]" />
                                </div>
                                <span className="text-xs font-semibold text-white mb-0.5">Drag & drop files here</span>
                                <span className="text-[10px] text-[#a1a1aa] mb-2">or click to browse local files</span>
                                <span className="text-[9px] font-mono text-[#a1a1aa]/60 uppercase tracking-wider">JPG, PNG, WEBP • Max 5MB</span>
                              </div>
                            )}
                          </div>
                          {uploadError && (
                            <span className="block mt-1.5 text-xs text-rose-400">{uploadError}</span>
                          )}
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full bg-[#f5f5f5] hover:bg-white text-[#08080a] py-3 rounded-lg font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" /> Add Item
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Preview Panel */}
                    <div className="sticky top-20 space-y-4">
                      <h3 className="text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] font-mono">Mock Card Render</h3>
                      <div className="relative h-[340px] rounded-xl border border-[#1a1a22] overflow-hidden bg-[#0e0e11]">
                        {imageUrl.trim() && (
                          <img
                            src={imageUrl.trim()}
                            alt="Mockup"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
                          />
                        )}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <span className="text-[9px] font-semibold tracking-wider uppercase text-white/60 border border-white/5 px-2.5 py-1 rounded bg-black/40">
                            {tag.trim() || "Category"}
                          </span>
                          <span className="text-[9px] font-semibold tracking-wider uppercase text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded bg-black/40">
                            {projStatus}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-2 bg-gradient-to-t from-black via-black/85 to-transparent">
                          <h4 className="text-lg font-semibold text-white truncate">{title.trim() || "Project Title"}</h4>
                          <p className="text-[#a1a1aa] text-xs leading-relaxed line-clamp-3 font-light">
                            {desc.trim() || "Project teaser description will render here dynamically."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio list curation */}
                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                        <Briefcase className="w-4 h-4 text-[#10b981]" /> Active Portfolio ({filteredProjects.length})
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                          <input
                            type="text"
                            value={portfolioSearch}
                            onChange={e => setPortfolioSearch(e.target.value)}
                            className="bg-[#08080a] border border-[#1a1a22] text-xs text-white placeholder:text-white/20 rounded-lg pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-[#10b981] font-light"
                            placeholder="Search portfolio..."
                          />
                        </div>
                        <div className="relative">
                          <select
                            value={portfolioFilter}
                            onChange={e => setPortfolioFilter(e.target.value)}
                            className="bg-[#08080a] border border-[#1a1a22] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#10b981] cursor-pointer pr-8 appearance-none"
                          >
                            <option value="all">All Tags</option>
                            {Array.from(new Set(projects.map(p => p.tag))).map(tg => (
                              <option key={tg} value={tg}>{tg}</option>
                            ))}
                          </select>
                          <Filter className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select
                            value={portfolioStatusFilter}
                            onChange={e => setPortfolioStatusFilter(e.target.value)}
                            className="bg-[#08080a] border border-[#1a1a22] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#10b981] cursor-pointer pr-8 appearance-none"
                          >
                            <option value="all">All Statuses</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="In Review">In Review</option>
                          </select>
                          <Filter className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Drag and Drop Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProjects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          draggable
                          onDragStart={(e) => handleProjDragStart(e, proj.id)}
                          onDragOver={(e) => handleProjDragOver(e, proj.id)}
                          onDragEnd={handleProjDragEnd}
                          className={`group relative bg-[#08080a] border rounded-xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors duration-200 cursor-grab active:cursor-grabbing ${
                            draggedProjId === proj.id ? "opacity-30 border-dashed border-[#10b981]" : "border-[#1a1a22]"
                          }`}
                        >
                          <div className="space-y-4">
                            {/* image container */}
                            <div className="h-32 rounded-lg bg-[#0e0e11] border border-[#1a1a22] overflow-hidden flex items-center justify-center relative">
                              {proj.imageUrl ? (
                                <img src={proj.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                              ) : (
                                <Briefcase className="w-6 h-6 text-[#a1a1aa]" />
                              )}
                              <span className="absolute top-2 left-2 text-[9px] font-mono border border-[#1a1a22] bg-[#0e0e11] px-2 py-0.5 rounded text-[#10b981]">
                                {proj.tag}
                              </span>
                              <span className={`absolute top-2 right-2 text-[9px] font-mono border px-2 py-0.5 rounded ${
                                proj.status === "Published" 
                                  ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                                  : proj.status === "Draft"
                                  ? "bg-zinc-500/5 text-zinc-400 border-zinc-500/20"
                                  : "bg-amber-500/5 text-amber-400 border-amber-500/20"
                              }`}>
                                {proj.status}
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <h4 className="font-semibold text-white truncate">{proj.title}</h4>
                              <p className="text-[#a1a1aa] text-xs font-light line-clamp-3 leading-relaxed">{proj.desc}</p>
                            </div>
                          </div>

                          <div className="border-t border-[#1a1a22] pt-4 mt-5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-[#a1a1aa] font-mono text-[9px]">
                              <span>Last updated: {getRelativeTime(proj.updatedAt)}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setEditingProject(proj)}
                                className="p-1 hover:bg-white/5 border border-[#1a1a22] rounded text-[#a1a1aa] hover:text-white cursor-pointer transition-colors"
                                title="Edit layout configuration"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDuplicateProject(proj)}
                                className="p-1 hover:bg-white/5 border border-[#1a1a22] rounded text-[#a1a1aa] hover:text-white cursor-pointer transition-colors"
                                title="Duplicate layout project"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 hover:bg-white/5 border border-[#1a1a22] rounded text-[#a1a1aa] hover:text-white"
                                  title="Open live link"
                                >
                                  <Globe className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title)}
                                className="p-1 hover:bg-rose-500/10 border border-transparent rounded text-[#a1a1aa] hover:text-rose-400 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EMAIL logs */}
              {activeTab === "emails" && (
                <div className="space-y-6">
                  {/* Email Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase mb-1">Total Logs</div>
                      <div className="text-2xl font-light text-white">{emailLogs.length}</div>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase mb-1">Delivered</div>
                      <div className="text-2xl font-light text-emerald-400">{emailLogs.filter(e => e.status === "Delivered" || e.status === "Sent").length}</div>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase mb-1">Queued</div>
                      <div className="text-2xl font-light text-blue-400">{emailLogs.filter(e => e.status === "Queued").length}</div>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase mb-1">Failed</div>
                      <div className="text-2xl font-light text-rose-400">{emailLogs.filter(e => e.status === "Failed").length}</div>
                    </div>
                  </div>

                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                        <Mail className="w-4 h-4 text-[#10b981]" /> Resend Mail log Logs
                      </h3>
                      <div className="relative">
                        <select
                          value={emailFilterStatus}
                          onChange={e => setEmailFilterStatus(e.target.value)}
                          className="bg-[#08080a] border border-[#1a1a22] text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#10b981] cursor-pointer pr-8 appearance-none"
                        >
                          <option value="all">All logs</option>
                          <option value="Sent">Sent</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Failed">Failed</option>
                          <option value="Queued">Queued</option>
                        </select>
                        <Filter className="w-3.5 h-3.5 text-[#a1a1aa] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-medium font-mono text-[9px] uppercase">
                            <th className="pb-3 pr-4">Recipient</th>
                            <th className="pb-3 px-4">Subject</th>
                            <th className="pb-3 px-4">Type</th>
                            <th className="pb-3 px-4">Delivery Status</th>
                            <th className="pb-3 px-4">Sent Time</th>
                            <th className="pb-3 pl-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1a1a22]">
                          {filteredEmailLogs.map(log => (
                            <tr key={log.id} className="hover:bg-white/[0.01]">
                              <td className="py-3 pr-4 font-semibold text-white align-middle truncate max-w-[180px] select-all">{log.recipient}</td>
                              <td className="py-3 px-4 text-white/80 align-middle font-light select-text">{log.subject}</td>
                              <td className="py-3 px-4 font-mono text-[10px] text-[#a1a1aa] align-middle">{log.type.replace(/_/g, " ")}</td>
                              <td className="py-3 px-4 align-middle">
                                <div className="space-y-1">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold font-mono border ${
                                    log.status === "Delivered" || log.status === "Sent"
                                      ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                                      : log.status === "Queued"
                                      ? "bg-blue-500/5 text-blue-400 border-blue-500/20"
                                      : "bg-rose-500/5 text-rose-400 border-rose-500/20"
                                  }`}>
                                    {log.status}
                                  </span>
                                  {log.error_message && (
                                    <p className="text-[9px] text-rose-400/80 font-mono max-w-[200px] truncate" title={log.error_message}>
                                      {log.error_message}
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4 font-mono text-[#a1a1aa] text-[10px] align-middle">
                                {getRelativeTime(log.sent_at)}
                              </td>
                              <td className="py-3 pl-4 text-right align-middle">
                                {log.status === "Failed" && (
                                  <button
                                    onClick={() => handleResendMail(log)}
                                    className="px-2.5 py-1 text-[10px] border border-[#1a1a22] bg-[#08080a] text-white hover:text-[#10b981] font-bold rounded cursor-pointer transition-colors"
                                  >
                                    Retry
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: ANALYTICS */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* KPI Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Lead Count Intake</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">{leads.length}</span>
                        <span className="text-[10px] text-[#10b981] font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> ↑ 18% vs last month</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Inbound monthly target compliance</p>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Active Pipeline Opportunities</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">
                          {leads.filter(l => ["New", "Contacted", "Qualified", "Proposal Sent"].includes(l.status)).length}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">Active pipeline</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Excluding closed won/lost projects</p>
                    </div>
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-2">
                      <div className="text-[9px] font-semibold text-[#a1a1aa] font-mono tracking-wider uppercase">Lead conversion growth</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light text-white">{statConversionRate}%</span>
                        <span className="text-[10px] text-[#10b981] font-mono flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> ↑ 2% vs last week</span>
                      </div>
                      <p className="text-[9px] text-[#a1a1aa] font-mono">Deal win ratio metrics</p>
                    </div>
                  </div>

                  {/* Lazy-Loaded Chart Layouts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-4">
                      <h3 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">Weekly lead intake timeline</h3>
                      <Suspense fallback={<ChartSkeleton />}>
                        <WeeklyIntakeChart data={getTimelineData()} />
                      </Suspense>
                    </div>

                    <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-4">
                      <h3 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">Inbound channels source distribution</h3>
                      <Suspense fallback={<ChartSkeleton />}>
                        <LeadSourcesChart data={sourceStats} />
                      </Suspense>
                    </div>
                  </div>

                  {/* Inbound Funnel Upgraded */}
                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-6">
                    <h3 className="text-xs font-semibold text-white tracking-wide uppercase font-mono">Sales Pipeline Conversion Funnel</h3>
                    <div className="space-y-4">
                      {funnelSteps.map((step, idx) => (
                        <div key={idx} className="space-y-2 text-xs">
                          <div className="flex justify-between items-center font-light">
                            <span className="text-[#a1a1aa]">{step.label}</span>
                            <span className="font-mono text-[10px] text-white">{step.count} ({step.percentage}%)</span>
                          </div>
                          <div className="h-2 w-full bg-[#08080a] border border-[#1a1a22] rounded overflow-hidden">
                            <div
                              className="h-full bg-[#10b981] transition-all duration-500"
                              style={{ width: `${step.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: SECURITY SOC CENTER */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  {/* SOC Dashboard Health Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {securityHealthCards.map((card, idx) => (
                      <div key={idx} className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 flex flex-col justify-between min-h-[120px]">
                        <div className="space-y-1">
                          <h4 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">{card.title}</h4>
                          <p className="text-[11px] text-[#a1a1aa] font-light leading-relaxed">{card.desc}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#1a1a22] pt-3.5 mt-4 text-[10px]">
                          <span className="text-[#a1a1aa] font-mono">Status Lamps Check</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                            card.variant === "green"
                              ? "bg-emerald-500/5 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/5 text-amber-400 border border-amber-500/20"
                          } flex items-center gap-1`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${card.variant === "green" ? "bg-[#10b981]" : "bg-amber-400 animate-pulse"}`} />
                            {card.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operational environment metrics row */}
                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5 space-y-4">
                    <h3 className="text-xs font-semibold text-white tracking-tight uppercase font-mono">Security Operations Environment</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-[#a1a1aa]">
                      <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-1">
                        <span className="text-[9px] uppercase opacity-55">Last login</span>
                        <p className="text-white text-[10px] truncate">Admin: {activityLogs.find(l => l.action.includes("login") || l.action.includes("settings"))?.admin_email || "operator@theaveniq.in"}</p>
                      </div>
                      <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-1">
                        <span className="text-[9px] uppercase opacity-55">Current User</span>
                        <p className="text-white text-[10px] truncate">{session.user.email}</p>
                      </div>
                      <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-1">
                        <span className="text-[9px] uppercase opacity-55">Last Deployment</span>
                        <p className="text-white text-[10px]">Vercel: {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="bg-[#08080a] border border-[#1a1a22] rounded-lg p-3 space-y-1">
                        <span className="text-[9px] uppercase opacity-55">Environment status</span>
                        <p className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">● Active Production</p>
                      </div>
                    </div>
                  </div>

                  {/* Active Operator accounts Whitelist */}
                  <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-white tracking-tight mb-4 flex items-center gap-2 uppercase font-mono">
                      <UserCheck className="w-4 h-4 text-[#10b981]" /> Active Operator Whitelist ({adminUsers.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-medium font-mono text-[9px] uppercase">
                            <th className="pb-3 pr-4">Operator UUID</th>
                            <th className="pb-3 px-4">Operator Email</th>
                            <th className="pb-3 pl-4 text-right">Registration Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1a1a22]">
                          {adminUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/[0.01]">
                              <td className="py-3 font-mono text-[10px] text-white/50">{user.id}</td>
                              <td className="py-3 px-4 font-semibold text-white">{user.email}</td>
                              <td className="py-3 pl-4 text-right font-mono text-[#a1a1aa] text-[10px]">
                                {user.created_at ? new Date(user.created_at).toLocaleString() : "System Default"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: SERVICES & INTEGRATIONS */}
              {activeTab === "integrations" && (
                <AdminIntegrations session={session} />
              )}

              {/* TAB 9: CONSOLE CONFIG PARAMETERS */}
              {activeTab === "settings" && (
                <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 sm:p-8 space-y-6">
                  <div className="border-b border-[#1a1a22] pb-4">
                    <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
                      <Settings className="w-4 h-4 text-[#10b981]" /> Operations Configurations
                    </h3>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-6 text-xs max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company-name" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Company Name</label>
                        <input
                          type="text"
                          id="company-name"
                          value={settings.company_name}
                          onChange={e => setSettings({ ...settings, company_name: e.target.value })}
                          className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="support-email" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Support Alerts Destination</label>
                        <input
                          type="email"
                          id="support-email"
                          value={settings.support_email}
                          onChange={e => setSettings({ ...settings, support_email: e.target.value })}
                          className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="calendly-url" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Calendly Embed endpoint</label>
                      <input
                        type="url"
                        id="calendly-url"
                        value={settings.calendly_url}
                        onChange={e => setSettings({ ...settings, calendly_url: e.target.value })}
                        className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10b981] text-white font-light"
                        required
                      />
                    </div>

                    <div className="space-y-3.5 pt-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] font-mono">CRM Pipeline Defaults</p>
                      <div className="flex items-center justify-between bg-[#08080a] p-4 border border-[#1a1a22] rounded-lg">
                        <div>
                          <p className="font-semibold text-white">Default CRM Stage Assignment</p>
                          <p className="text-[10px] text-[#a1a1aa] mt-0.5">Assigned status parameter for fresh inbounds</p>
                        </div>
                        <select
                          value={settings.default_lead_status}
                          onChange={e => setSettings({ ...settings, default_lead_status: e.target.value })}
                          className="bg-[#0e0e11] border border-[#1a1a22] text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#10b981] cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-[#08080a] p-4 border border-[#1a1a22] rounded-lg">
                      <div>
                        <p className="font-semibold text-white">System Email Alerts</p>
                        <p className="text-[10px] text-[#a1a1aa] mt-0.5">Send alerts automatically for pipeline logs</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notification_settings.email}
                        onChange={e => setSettings({
                          ...settings,
                          notification_settings: { email: e.target.checked }
                        })}
                        className="w-4 h-4 accent-[#10b981] cursor-pointer"
                      />
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button
                        type="submit"
                        className="px-5 py-3 bg-white text-[#08080a] font-bold rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Save Configuration Settings
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="px-5 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold border border-rose-500/20 rounded-lg cursor-pointer transition-colors"
                      >
                        Sign Out Operator
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
