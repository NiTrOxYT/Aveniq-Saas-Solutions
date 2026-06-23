import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Zod Schema for input validation
const demoSchema = z.object({
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
  message: z
    .string()
    .trim()
    .min(1, "Project details are required.")
    .max(1000, "Project details must be 1000 characters or less."),
});

export default function BookDemoPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Page Load Timestamp for bot detection
  const loadTimeRef = useRef<number>(Date.now());

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(""); // Honeypot Field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset load time on mount
    loadTimeRef.current = Date.now();

    // Animate the section
    gsap.fromTo(
      sectionRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate the form
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 1. Honeypot check: If the hidden honeypot field has any value, reject silent/abort.
    if (websiteUrl.trim() !== "") {
      // Simulate successful submit to confuse bots
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 800);
      return;
    }

    // 2. Timestamp check: Reject requests completed too quickly (< 3 seconds)
    const timeElapsed = Date.now() - loadTimeRef.current;
    if (timeElapsed < 3000) {
      toast({
        title: "Submission Error",
        description: "Your submission was rejected as suspicious traffic. Please wait and try again.",
        variant: "destructive",
      });
      return;
    }

    // 3. Zod schema validation
    const result = demoSchema.safeParse({ name, email, company, message });
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

    // Simulate API Submission / Production Processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Request Received",
        description: "Thank you! We will reach out to schedule your demo soon.",
      });
    }, 1200);
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 relative z-10 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6">Book a Demo</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Schedule a personalized consultation with our team to discuss your project and how we can help bring it to life.
          </p>
        </div>

        <div ref={formRef} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center justify-center"
            >
              <CheckCircle2 className="w-16 h-16 text-[#9C89D9] mb-6 animate-pulse" />
              <h2 className="text-3xl font-serif mb-4">Demo Requested</h2>
              <p className="text-white/60 max-w-md mx-auto leading-relaxed mb-8">
                Your request has been securely processed. A representative from our solutions team will email you within 24 hours to schedule your consultation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setCompany("");
                  setMessage("");
                  setWebsiteUrl("");
                  loadTimeRef.current = Date.now();
                }}
                className="border border-white/10 rounded-lg px-6 py-2.5 hover:bg-white/5 transition-all text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Spam Bot Honeypot (Hidden from human users) */}
              <div className="hidden-honeypot" style={{ position: "absolute", height: 0, width: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-white/5 border ${errors.name ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder:text-white/20 premium-input transition-all duration-200`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.name}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-white/5 border ${errors.email ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder:text-white/20 premium-input transition-all duration-200`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`w-full bg-white/5 border ${errors.company ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder:text-white/20 premium-input transition-all duration-200`}
                  placeholder="Your company name"
                />
                {errors.company && (
                  <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.company}</span>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Project Details</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className={`w-full bg-white/5 border ${errors.message ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/10 focus:ring-[#9C89D9]/50"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder:text-white/20 premium-input transition-all duration-200`}
                  placeholder="Tell us about your project..."
                ></textarea>
                {errors.message && (
                  <span className="block mt-1.5 text-xs text-rose-400 font-medium">{errors.message}</span>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(103,80,164,0.3)]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>Schedule Demo <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
