import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Zod Schema for validation
const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or less."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Invalid email address format.")
    .max(254, "Email must be 254 characters or less."),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .max(100, "Company name must be 100 characters or less."),
  projectType: z.string().min(1, "Please select a project type."),
  budgetRange: z.string().min(1, "Please select your budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  contactMethod: z.string().min(1, "Please select a contact method."),
  message: z
    .string()
    .trim()
    .min(1, "Project details are required.")
    .max(1000, "Project details must be 1000 characters or less."),
});

// Analytics utility
const trackEvent = (eventName: string, metadata?: any) => {
  console.log(`[Analytics Event] ${eventName}`, metadata);
  try {
    const logs = JSON.parse(sessionStorage.getItem("aveniq_analytics_logs") || "[]");
    logs.push({ event: eventName, timestamp: new Date().toISOString(), ...metadata });
    sessionStorage.setItem("aveniq_analytics_logs", JSON.stringify(logs));
  } catch (e) {}
  
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, metadata);
  }
};

export default function StartProjectPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Page Load Timestamp for bot detection
  const loadTimeRef = useRef<number>(Date.now());
  const formStartedRef = useRef<boolean>(false);
  const submittedRef = useRef<boolean>(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [message, setMessage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(""); // Honeypot Field
  const [source, setSource] = useState("Direct"); // Source Tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTimeRef.current = Date.now();
    window.scrollTo(0, 0);
    
    // Auto-fill source tracking
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlSource = params.get("utm_source") || params.get("ref") || params.get("source");
      if (urlSource) {
        setSource(urlSource);
      } else if (document.referrer) {
        try {
          const hostname = new URL(document.referrer).hostname;
          if (hostname.includes("google")) setSource("Google");
          else if (hostname.includes("linkedin")) setSource("LinkedIn");
          else if (hostname.includes("instagram")) setSource("Instagram");
          else setSource("Referral");
        } catch (e) {
          setSource("Referral");
        }
      }
    }

    trackEvent("Start Project Page Viewed");

    // Track abandonment on exit
    return () => {
      if (formStartedRef.current && !submittedRef.current) {
        trackEvent("Form Abandoned");
      }
    };
  }, []);

  const handleInputChange = (setter: any) => (e: any) => {
    setter(e.target.value);
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent("Form Started");
    }
  };

  const checkRateLimit = (): boolean => {
    try {
      const now = Date.now();
      const submissions = JSON.parse(localStorage.getItem("aveniq_submissions_timestamps") || "[]") as number[];
      const oneHourAgo = now - 60 * 60 * 1000;
      const recentSubmissions = submissions.filter((ts) => ts > oneHourAgo);
      
      if (recentSubmissions.length >= 5) {
        return false;
      }
      return true;
    } catch (e) {
      return true;
    }
  };

  const recordSubmission = () => {
    try {
      const now = Date.now();
      const submissions = JSON.parse(localStorage.getItem("aveniq_submissions_timestamps") || "[]") as number[];
      submissions.push(now);
      localStorage.setItem("aveniq_submissions_timestamps", JSON.stringify(submissions));
    } catch (e) {}
  };

  const saveLeadLocally = (data: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem("aveniq_offline_leads") || "[]");
      existing.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem("aveniq_offline_leads", JSON.stringify(existing));
    } catch (e) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Spam rate limiter check (Max 5/hour)
    if (!checkRateLimit()) {
      toast({
        title: "Submission Blocked",
        description: "Too many requests have been submitted from your network. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    // 1. Honeypot check
    if (websiteUrl.trim() !== "") {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        submittedRef.current = true;
      }, 800);
      return;
    }

    // 2. Timing check
    const timeElapsed = Date.now() - loadTimeRef.current;
    if (timeElapsed < 3000) {
      toast({
        title: "Submission Error",
        description: "Your submission was rejected as suspicious traffic. Please wait and try again.",
        variant: "destructive",
      });
      return;
    }

    // 3. Validation
    const result = projectSchema.safeParse({
      name,
      email,
      company,
      projectType,
      budgetRange,
      timeline,
      contactMethod,
      message,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form inputs and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    let response: Response | null = null;

    try {
      response = await fetch("/api/start-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          budget: budgetRange,
          timeline,
          preferredContactMethod: contactMethod,
          projectDescription: message,
          website_url: websiteUrl, // Honeypot
          time_elapsed: timeElapsed, // Speed check
          source,
        }),
      });

      if (!response.ok) {
        let errMsg = "An unexpected error occurred. Please try again in a few minutes.";
        if (response.status === 400) {
          errMsg = "Please review your information and try again.";
        } else if (response.status === 403) {
          errMsg = "Request origin not allowed.";
        } else if (response.status === 429) {
          errMsg = "Too many requests have been submitted from your network. Please try again later.";
        } else if (response.status === 500) {
          errMsg = "An unexpected error occurred. Please try again in a few minutes.";
        } else {
          try {
            const json = await response.json();
            if (json.error) errMsg = json.error;
          } catch (e) {}
        }
        const error = new Error(errMsg) as any;
        error.status = response.status;
        error.response = response;
        throw error;
      }

      recordSubmission();
      trackEvent("Form Completed", { projectType, budgetRange, source });

      setIsSubmitting(false);
      setSubmitted(true);
      submittedRef.current = true;
      toast({
        title: "Request Received",
        description: "Thank you! We will reach out to you within 48 hours.",
      });
      trackEvent("Success Page Viewed");

    } catch (err: any) {
      console.error("Start Project Error", err);
      if (response) {
        console.error("Response", response);
      }

      if (err.status === 429 || (err.message && err.message.includes("Too many requests"))) {
        toast({
          title: "Submission Blocked",
          description: "Too many requests have been submitted from your network. Please try again later.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Fallback lead saving locally on network/server errors
      const leadData = {
        name,
        email,
        company,
        project_type: projectType,
        budget_range: budgetRange,
        timeline,
        contact_method: contactMethod,
        message,
        source,
      };
      saveLeadLocally(leadData);

      toast({
        title: "Submission Error",
        description: err.message || "An unexpected error occurred. Please try again in a few minutes.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 md:py-32 relative z-10 min-h-screen bg-black overflow-hidden flex items-center">
      {/* Subtle ambient lighting vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,80,164,0.04)_0%,rgba(0,0,0,0)_60%)] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-16 px-6 bg-[#08080a] border border-white/[0.06] rounded-3xl shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-[#9C89D9] mx-auto mb-6" />
            <h2 className="text-3xl font-medium text-white mb-2">Request Received</h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-md mx-auto font-light text-sm">
              Thank you for reaching out. Our team will review your requirements and get back to you within 48 hours.
            </p>

            {/* Next Steps Info */}
            <div className="text-left bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 mb-10 max-w-md mx-auto">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">What happens next?</h4>
              <ul className="space-y-3.5 text-xs text-white/50 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono">1.</span>
                  <span>We review your requirements and tech specifications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono">2.</span>
                  <span>We prepare custom architecture and development roadmap recommendations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono">3.</span>
                  <span>We contact you within 48 hours to align on strategic kickoff.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F5F5F5] hover:bg-white text-[#0A0A0A] rounded-xl text-sm font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Return Home
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
            
            {/* Left Side (45% on Desktop) */}
            <div className="w-full lg:w-[45%] flex flex-col">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
                Let’s Build Something Exceptional
              </h1>
              <p className="text-white/60 text-base leading-relaxed mb-10 font-light max-w-[50ch]">
                From SaaS platforms and AI automation to mobile apps and custom software, we help ambitious businesses launch faster and scale smarter.
              </p>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-8 border-t border-b border-white/[0.06] mb-12">
                <div>
                  <div className="text-2xl sm:text-3xl font-medium text-white">150+</div>
                  <div className="text-xs text-white/40 tracking-wider font-mono uppercase mt-1">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-medium text-white">48 Hour</div>
                  <div className="text-xs text-white/40 tracking-wider font-mono uppercase mt-1">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-medium text-white">Global</div>
                  <div className="text-xs text-white/40 tracking-wider font-mono uppercase mt-1">Clients</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-medium text-white">Modern</div>
                  <div className="text-xs text-white/40 tracking-wider font-mono uppercase mt-1">Tech Stack</div>
                </div>
              </div>

              {/* Why Work With Aveniq */}
              <div className="mb-12">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#9C89D9]/80 mb-6">Why Aveniq</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                    <h4 className="text-sm font-semibold text-white mb-1">Strategy First</h4>
                    <p className="text-white/40 text-xs leading-relaxed font-light">Every project begins with a technical and business discovery session.</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                    <h4 className="text-sm font-semibold text-white mb-1">Built For Scale</h4>
                    <p className="text-white/40 text-xs leading-relaxed font-light">Architecture designed for growth, performance, and security.</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                    <h4 className="text-sm font-semibold text-white mb-1">Fast Execution</h4>
                    <p className="text-white/40 text-xs leading-relaxed font-light">Rapid delivery cycles without compromising quality.</p>
                  </div>
                </div>
              </div>

              {/* Process Timeline */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#9C89D9]/80 mb-6">Consultation Process</h3>
                <div className="relative pl-6 border-l border-white/[0.06] space-y-8 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#9C89D9]" />
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-0.5">01</h4>
                    <p className="text-sm font-medium text-white">Discovery Call</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-0.5">02</h4>
                    <p className="text-sm font-medium text-white">Project Planning</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-0.5">03</h4>
                    <p className="text-sm font-medium text-white">Proposal & Roadmap</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[29px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-0.5">04</h4>
                    <p className="text-sm font-medium text-white">Development Kickoff</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (55% on Desktop) */}
            <div className="w-full lg:w-[55%]">
              {/* Social Proof Header Row */}
              <div className="mb-6 px-1.5 text-center sm:text-left select-none">
                <p className="text-xs text-white/40 mb-3 font-light">Trusted by startups, agencies, and growing businesses.</p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-5 gap-y-2 text-[10px] font-mono tracking-wider uppercase text-white/30">
                  <span>150+ Projects</span>
                  <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:inline" />
                  <span>98% Satisfaction</span>
                  <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:inline" />
                  <span>48h Response</span>
                </div>
              </div>

              {/* Form Container Card */}
              <div className="bg-[#08080a] border border-white/[0.06] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Spam Bot Honeypot */}
                  <div className="hidden" style={{ position: "absolute", height: 0, width: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                    <label htmlFor="website_url">Do not fill this out if you are human</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Section 1: Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">01. Primary Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={handleInputChange(setName)}
                          className={`w-full h-12 bg-white/[0.03] border ${errors.name ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:border-transparent text-white placeholder:text-white/20 transition-all duration-200 text-sm`}
                          placeholder="your name"
                        />
                        {errors.name && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.name}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleInputChange(setEmail)}
                          className={`w-full h-12 bg-white/[0.03] border ${errors.email ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:border-transparent text-white placeholder:text-white/20 transition-all duration-200 text-sm`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.email}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Scope */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">02. Context</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Company Name</label>
                        <input
                          type="text"
                          id="company"
                          value={company}
                          onChange={handleInputChange(setCompany)}
                          className={`w-full h-12 bg-white/[0.03] border ${errors.company ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:border-transparent text-white placeholder:text-white/20 transition-all duration-200 text-sm`}
                          placeholder="your company"
                        />
                        {errors.company && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.company}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Project Type</label>
                        <div className="relative">
                          <select
                            id="projectType"
                            value={projectType}
                            onChange={handleInputChange(setProjectType)}
                            className={`w-full h-12 bg-white/[0.03] border ${errors.projectType ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:border-transparent text-white transition-all duration-200 appearance-none text-sm`}
                          >
                            <option value="" disabled className="bg-black">select type</option>
                            <option value="Custom SaaS" className="bg-black">Custom SaaS</option>
                            <option value="AI Automation" className="bg-black">AI Automation</option>
                            <option value="Mobile App" className="bg-black">Mobile App</option>
                            <option value="Website" className="bg-black">Website</option>
                            <option value="E-Commerce" className="bg-black">E-Commerce</option>
                            <option value="Internal Tool" className="bg-black">Internal Tool</option>
                            <option value="Other" className="bg-black">Other</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.projectType && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.projectType}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Budget & Timeline */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">03. Project Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budgetRange" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Estimated Project Budget *</label>
                        <div className="relative">
                          <select
                            id="budgetRange"
                            value={budgetRange}
                            onChange={handleInputChange(setBudgetRange)}
                            className={`w-full h-12 bg-white/[0.03] border ${errors.budgetRange ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:border-transparent text-white transition-all duration-200 appearance-none text-sm`}
                          >
                            <option value="" disabled className="bg-black">select range</option>
                            <option value="Under ₹50,000" className="bg-black">Under ₹50,000</option>
                            <option value="₹50,000 - ₹2 Lakhs" className="bg-black">₹50,000 - ₹2 Lakhs</option>
                            <option value="₹2 Lakhs - ₹5 Lakhs" className="bg-black">₹2 Lakhs - ₹5 Lakhs</option>
                            <option value="₹5 Lakhs - ₹10 Lakhs" className="bg-black">₹5 Lakhs - ₹10 Lakhs</option>
                            <option value="₹10 Lakhs+" className="bg-black">₹10 Lakhs+</option>
                            <option value="Not Sure Yet" className="bg-black">Not Sure Yet</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.budgetRange && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.budgetRange}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Timeline</label>
                        <div className="relative">
                          <select
                            id="timeline"
                            value={timeline}
                            onChange={handleInputChange(setTimeline)}
                            className={`w-full h-12 bg-white/[0.03] border ${errors.timeline ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:border-transparent text-white transition-all duration-200 appearance-none text-sm`}
                          >
                            <option value="" disabled className="bg-black">select timeline</option>
                            <option value="ASAP" className="bg-black">ASAP</option>
                            <option value="Within 30 Days" className="bg-black">Within 30 Days</option>
                            <option value="1-3 Months" className="bg-black">1-3 Months</option>
                            <option value="3-6 Months" className="bg-black">3-6 Months</option>
                            <option value="Flexible" className="bg-black">Flexible</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.timeline && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.timeline}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Project Description */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">04. Engagement Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="contactMethod" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Preferred Contact Method</label>
                        <div className="relative">
                          <select
                            id="contactMethod"
                            value={contactMethod}
                            onChange={handleInputChange(setContactMethod)}
                            className={`w-full h-12 bg-white/[0.03] border ${errors.contactMethod ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:border-transparent text-white transition-all duration-200 appearance-none text-sm`}
                          >
                            <option value="" disabled className="bg-black">select contact method</option>
                            <option value="Email" className="bg-black">Email</option>
                            <option value="Phone / WhatsApp" className="bg-black">Phone / WhatsApp</option>
                            <option value="Video Call (Google Meet/Zoom)" className="bg-black">Video Call (Google Meet/Zoom)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.contactMethod && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.contactMethod}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Project Description</label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={handleInputChange(setMessage)}
                          rows={4}
                          className={`w-full bg-white/[0.03] border ${errors.message ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:border-transparent text-white placeholder:text-white/20 transition-all duration-200 text-sm`}
                          placeholder="Provide details about what you want us to build, any specific technical requirements, or business goals..."
                        ></textarea>
                        {errors.message && (
                          <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.message}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F5F5F5] hover:bg-white text-[#0A0A0A] h-14 rounded-xl font-semibold text-sm transition-colors active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border border-black/20 border-t-black animate-spin" />
                      ) : (
                        <>Start Your Project <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
