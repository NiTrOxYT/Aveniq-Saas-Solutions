import React, { useState, useEffect } from "react";
import { Mail, RefreshCw, Layers, Globe, Activity, Check, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Session } from "@supabase/supabase-js";

interface AdminIntegrationsProps {
  session: Session | null;
}

interface BrevoStatus {
  configured: boolean;
  apiKeyPresent: boolean;
  apiReachable: boolean;
  apiStatus: string;
  senderEmail: string;
  senderVerified: boolean;
  domainStatus: string;
  domainVerified: boolean;
  health: "healthy" | "warning" | "critical" | "unknown";
  lastEmailSent: string | null;
  errorMessage?: string;
  ipError?: boolean;
  success?: boolean;
  status?: number;
  brevoError?: any;
  isTransactionalKey?: boolean;
  headers?: Record<string, string>;
  exception?: {
    message: string;
    stack?: string;
  };
}

export const AdminIntegrations: React.FC<AdminIntegrationsProps> = ({ session }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);
  const [status, setStatus] = useState<BrevoStatus | null>(null);

  const fetchStatus = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin-integrations", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Integration request", {
        url: "/api/admin-integrations",
        headers: {
          "Authorization": `Bearer ${session.access_token ? session.access_token.substring(0, 15) + '...' : 'none'}`,
          "Content-Type": "application/json",
        },
        responseStatus: res.status
      });

      if (!res.ok) {
        let errData: any = null;
        try {
          errData = await res.json();
        } catch (_) {}

        if (errData && errData.success === false) {
          setStatus(errData);
          setLoading(false);
          return;
        }

        if (res.status === 401) {
          throw new Error("Authentication failed for integration service");
        }
        throw new Error(`HTTP Error ${res.status}`);
      }

      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      console.error("[Integrations Panel] Failed to fetch status:", err);
      const isAuthError = err.message === "Authentication failed for integration service";
      toast({
        title: isAuthError ? "Authentication Failed" : "Connection Failed",
        description: isAuthError 
          ? "Authentication failed for integration service" 
          : "Failed to connect to integration audit backend.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [session]);

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (!testEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSendingTest(true);
    try {
      const res = await fetch("/api/admin-integrations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: testEmail }),
      });

      console.log("Integration request", {
        url: "/api/admin-integrations",
        headers: {
          "Authorization": `Bearer ${session.access_token ? session.access_token.substring(0, 15) + '...' : 'none'}`,
          "Content-Type": "application/json",
        },
        responseStatus: res.status
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication failed for integration service");
        }
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      toast({
        title: "Test Email Sent",
        description: `Successfully dispatched connection test email to ${testEmail}.`,
      });
      setTestEmail("");
      // Refresh status to capture updated lastEmailSent timestamp
      fetchStatus();
    } catch (err: any) {
      console.error("[Integrations Panel] Send test email failed:", err);
      const isAuthError = err.message === "Authentication failed for integration service";
      toast({
        title: isAuthError ? "Authentication Failed" : "Dispatch Failed",
        description: isAuthError 
          ? "Authentication failed for integration service" 
          : err.message || "An error occurred while sending the test email.",
        variant: "destructive",
      });
    } finally {
      setSendingTest(false);
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "healthy":
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Healthy
          </span>
        );
      case "warning":
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Action Required
          </span>
        );
      case "critical":
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Error
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Brevo Integration Card */}
      <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#1a1a22] pb-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-2 uppercase font-mono">
            <Mail className="w-4 h-4 text-[#10b981]" /> Transactional Email Service
          </h3>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="p-1 text-[#a1a1aa] hover:text-white hover:bg-white/[0.04] rounded transition-colors disabled:opacity-50"
            title="Refresh Status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#10b981]" : ""}`} />
          </button>
        </div>

        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <div className="w-6 h-6 rounded-full border border-white/5 border-t-[#10b981] animate-spin" />
            <p className="text-[10px] font-mono text-[#a1a1aa] tracking-widest uppercase">Auditing Services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Status Details */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white">Provider: Brevo</p>
                  <p className="text-[10px] text-[#a1a1aa] font-light">Transactional SMTP & Marketing API endpoint</p>
                </div>
                {status ? getHealthBadge(status.health) : getHealthBadge("unknown")}
              </div>

              {status?.ipError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg flex items-start gap-2.5 text-xs font-light leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-[10px] font-mono mb-1">Security Alert</p>
                    <p>Brevo security settings are blocking requests from the deployment environment.</p>
                  </div>
                </div>
              )}

              {status?.success === false && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg flex items-start gap-2.5 text-xs font-light leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-2 w-full">
                    <p className="font-semibold uppercase tracking-wider text-[10px] font-mono">Brevo Connection Error</p>
                    <p className="text-[11px]">
                      Brevo API returned status <strong className="font-mono text-white bg-white/10 px-1 py-0.5 rounded">{status.status || "Unknown"}</strong>.
                      {status.isTransactionalKey === false && (
                        <span className="block mt-1 text-amber-400 font-normal">
                          <strong>Warning:</strong> API key does not start with <code>xkeysib-</code>. Please verify you are using a <strong>Brevo Transactional API Key</strong> (v3 API key) and not an SMTP password key.
                        </span>
                      )}
                    </p>
                    {status.brevoError && (
                      <pre className="p-2 bg-black/40 border border-white/5 rounded font-mono text-[10px] text-[#a1a1aa] overflow-x-auto whitespace-pre-wrap max-h-40">
                        {JSON.stringify(status.brevoError, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a1a1aa]/50">API Key Present</span>
                  <p className="text-xs font-semibold text-white">
                    {status?.apiKeyPresent ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Not Configured
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a1a1aa]/50">API Reachable</span>
                  <p className="text-xs font-semibold text-white">
                    {status?.apiReachable ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Reachable
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Unreachable
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a1a1aa]/50">Sender Verified</span>
                  <p className="text-xs font-semibold text-white">
                    {status?.senderVerified ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified ({status.senderEmail})
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Unverified ({status?.senderEmail || "hello@theaveniq.in"})
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a1a1aa]/50">Domain Verified</span>
                  <p className="text-xs font-semibold text-white">
                    {status?.domainVerified ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> {status?.domainStatus || "Not Configured"}
                      </span>
                    )}
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 bg-[#08080a] border border-[#1a1a22] rounded-lg space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a1a1aa]/50">Last Email Dispatched</span>
                  <p className="text-xs font-semibold text-white">
                    {status?.lastEmailSent ? (
                      <span className="text-white text-[11px] font-mono">
                        {new Date(status.lastEmailSent).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[#a1a1aa]/40 italic">No data available yet</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Test Email Action Form */}
            <div className="p-6 bg-[#08080a] border border-[#1a1a22] rounded-xl flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#10b981] flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> Diagnostics
                </span>
                <h4 className="text-xs font-semibold text-white">Send Inbound Test Email</h4>
                <p className="text-[10px] text-[#a1a1aa] font-light leading-relaxed">
                  Triggers a live transactional test email via Brevo REST API to verify API endpoint handshake and Supabase log entries.
                </p>
              </div>

              <form onSubmit={handleSendTestEmail} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="test-email-input" className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">Destination Email</label>
                  <input
                    type="email"
                    id="test-email-input"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="admin@theaveniq.in"
                    className="w-full bg-[#0e0e11] border border-[#1a1a22] rounded-lg px-3 py-2 focus:outline-none focus:border-[#10b981] text-white font-light text-xs"
                    disabled={sendingTest || !status?.configured}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingTest || !status?.configured}
                  className="w-full bg-[#F5F5F5] hover:bg-white text-black py-2.5 rounded-lg font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingTest ? (
                    <div className="w-3.5 h-3.5 rounded-full border border-black/20 border-t-black animate-spin" />
                  ) : (
                    <>Send Test Email <ArrowRight className="w-3 h-3" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Future Integrations Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a1a1aa]/50 pl-1">Future Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Analytics */}
          <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 flex flex-col justify-between opacity-60">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-500" /> Google Analytics 4
                </h4>
                <span className="text-[9px] font-mono uppercase text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Not Connected
                </span>
              </div>
              <p className="text-[10px] text-[#a1a1aa] font-light leading-relaxed">
                Connect your GA4 stream measurement ID to sync user events, funnel metrics, and marketing source tracking in the admin telemetry deck.
              </p>
            </div>
            <div className="pt-5">
              <button
                disabled
                className="px-4 py-2 bg-white/5 border border-white/10 text-white/30 rounded-lg text-[10px] font-semibold cursor-not-allowed"
              >
                Configure
              </button>
            </div>
          </div>

          {/* Microsoft Clarity */}
          <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 flex flex-col justify-between opacity-60">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-500" /> Microsoft Clarity
                </h4>
                <span className="text-[9px] font-mono uppercase text-purple-500/80 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Not Connected
                </span>
              </div>
              <p className="text-[10px] text-[#a1a1aa] font-light leading-relaxed">
                Sync user session replays, heatmaps, and rage-click telemetry audits inside the operations control center.
              </p>
            </div>
            <div className="pt-5">
              <button
                disabled
                className="px-4 py-2 bg-white/5 border border-white/10 text-white/30 rounded-lg text-[10px] font-semibold cursor-not-allowed"
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
