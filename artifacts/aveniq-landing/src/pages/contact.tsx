import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { Mail, Briefcase, AlertCircle, Copy, Check, ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

// Zod schema for client-side form validation
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
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
  contactReason: z.enum(["New Project", "General Inquiry", "Support Request", "Partnership", "Other"], {
    errorMap: () => ({ message: "Please select a valid reason for contact." })
  }),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(200, "Subject must be 200 characters or less."),
  message: z
    .string()
    .trim()
    .min(1, "Message content is required.")
    .max(2000, "Message must be 2000 characters or less."),
});

type ContactFormFields = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [formValues, setFormValues] = useState<ContactFormFields>({
    name: "",
    email: "",
    company: "",
    contactReason: "New Project",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Anti-bot security markers
  const loadTimeRef = useRef<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    loadTimeRef.current = Date.now();
    window.scrollTo({ top: 0 });
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      toast({
        title: "Copied!",
        description: `${email} copied to clipboard.`,
      });
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormFields]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    // Client-side validations
    const validation = contactSchema.safeParse(formValues);
    if (!validation.success) {
      const errors: Partial<Record<keyof ContactFormFields, string>> = {};
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as keyof ContactFormFields] = err.message;
        }
      });
      setFormErrors(errors);
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      return;
    }

    // Bot trap calculations
    const timeElapsed = Date.now() - loadTimeRef.current;
    const formElement = e.currentTarget;
    const honeypot = (formElement.querySelector('input[name="website_url"]') as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          website_url: honeypot,
          time_elapsed: timeElapsed,
          source: document.referrer || "Direct"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = "An unexpected error occurred. Please try again in a few minutes.";
        if (res.status === 400) {
          errorMsg = data.error || "Please review your information and try again.";
        } else if (res.status === 403) {
          errorMsg = "Request origin not allowed.";
        } else if (res.status === 429) {
          errorMsg = "Too many requests have been submitted from your network. Please try again later.";
        }
        
        toast({
          title: "Submission Failed",
          description: errorMsg,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      toast({
        title: "Message Sent Successfully",
        description: "Thanks for reaching out! We will contact you shortly."
      });
    } catch (err: any) {
      toast({
        title: "Network Connection Failed",
        description: "Please check your network and try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      title: "Project Inquiries",
      email: "hello@theaveniq.in",
      desc: "New project discussions, software development requests, business consultations, and SaaS inquiries.",
      icon: Briefcase
    },
    {
      title: "General Questions",
      email: "info@theaveniq.in",
      desc: "Questions about services, partnerships, media inquiries, and general communication.",
      icon: Mail
    },
    {
      title: "Technical Support",
      email: "support@theaveniq.in",
      desc: "Technical support, bug reports, existing client assistance, and service-related issues.",
      icon: AlertCircle
    }
  ];

  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white flex flex-col justify-between">
      <BackgroundEffects />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="max-w-2xl mb-16 sm:mb-20">
            <h1 
              className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6"
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.03em" }}
            >
              Contact Aveniq
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Have a project, partnership opportunity, or question? We’d love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/start-project")}
                className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-full font-bold text-xs transition-colors cursor-pointer"
              >
                Start Your Project
              </button>
              <a
                href="mailto:hello@theaveniq.in"
                className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                Email Us <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 50 / 50 Desktop Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Premium Contact Cards */}
            <div className="space-y-6">
              {contactCards.map(card => {
                const Icon = card.icon;
                const isCopied = copiedEmail === card.email;
                return (
                  <div
                    key={card.email}
                    className="bg-[#0e0e11] border border-white/[0.04] rounded-2xl p-6 space-y-4 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#9C89D9]" />
                        </div>
                        <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                      </div>
                      <button
                        onClick={() => handleCopyEmail(card.email)}
                        className="p-2 rounded-lg border border-white/[0.04] hover:bg-white/[0.02] text-white/50 hover:text-white transition-all cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{card.desc}</p>
                    <a
                      href={`mailto:${card.email}`}
                      className="inline-block text-[#9C89D9] hover:text-[#ada0e8] text-xs font-mono select-all font-semibold"
                    >
                      {card.email}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Contact Ingest Form */}
            <div className="bg-[#0e0e11] border border-white/[0.04] rounded-3xl p-8 sm:p-10 relative">
              {success ? (
                /* Success State */
                <div className="space-y-6 py-8 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto sm:mx-0">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">Message Sent</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Thanks for reaching out. Our team will review your message and respond shortly.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => navigate("/")}
                      className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Home className="w-3.5 h-3.5" /> Return Home
                    </button>
                    <button
                      onClick={() => navigate("/start-project")}
                      className="px-6 py-3 bg-transparent border border-white/10 hover:border-white/20 text-white rounded-full font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Start Your Project
                    </button>
                  </div>
                </div>
              ) : (
                /* Normal Form Panel */
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from screen readers/robots) */}
                  <input
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 pointer-events-none -z-10"
                    placeholder="Website"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full h-12 bg-black border ${formErrors.name ? 'border-rose-500/50' : 'border-white/[0.06] focus:border-[#9C89D9]'} rounded-xl px-4 text-xs font-light focus:outline-none transition-colors text-white`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-rose-400 text-[10px] font-medium pl-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full h-12 bg-black border ${formErrors.email ? 'border-rose-500/50' : 'border-white/[0.06] focus:border-[#9C89D9]'} rounded-xl px-4 text-xs font-light focus:outline-none transition-colors text-white`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-rose-400 text-[10px] font-medium pl-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Company Name *</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formValues.company}
                        onChange={handleInputChange}
                        required
                        className={`w-full h-12 bg-black border ${formErrors.company ? 'border-rose-500/50' : 'border-white/[0.06] focus:border-[#9C89D9]'} rounded-xl px-4 text-xs font-light focus:outline-none transition-colors text-white`}
                        placeholder="Cyberdyne Systems"
                      />
                      {formErrors.company && (
                        <p className="text-rose-400 text-[10px] font-medium pl-1">{formErrors.company}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contactReason" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Reason for Contact *</label>
                      <div className="relative">
                        <select
                          id="contactReason"
                          name="contactReason"
                          value={formValues.contactReason}
                          onChange={handleInputChange}
                          className="w-full h-12 bg-black border border-white/[0.06] focus:border-[#9C89D9] rounded-xl px-4 text-xs font-light focus:outline-none transition-colors text-white appearance-none cursor-pointer pr-10"
                        >
                          <option value="New Project">New Project</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Support Request">Support Request</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full h-12 bg-black border ${formErrors.subject ? 'border-rose-500/50' : 'border-white/[0.06] focus:border-[#9C89D9]'} rounded-xl px-4 text-xs font-light focus:outline-none transition-colors text-white`}
                      placeholder="How can we assist you?"
                    />
                    {formErrors.subject && (
                      <p className="text-rose-400 text-[10px] font-medium pl-1">{formErrors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[10px] font-semibold tracking-wider text-white/50 uppercase font-mono">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full bg-black border ${formErrors.message ? 'border-rose-500/50' : 'border-white/[0.06] focus:border-[#9C89D9]'} rounded-xl p-4 text-xs font-light focus:outline-none transition-colors text-white resize-none`}
                      placeholder="Provide additional details regarding your request..."
                    />
                    {formErrors.message && (
                      <p className="text-rose-400 text-[10px] font-medium pl-1">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-white/90 text-black py-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 rounded-full border border-black/20 border-t-black animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Minimalist Chevron representation to prevent extra imports
function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
