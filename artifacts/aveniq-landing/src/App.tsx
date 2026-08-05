import React, { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import BackgroundVideo from "@/components/BackgroundVideo";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBanner from "@/components/StatsBanner";
import ServicesSection from "@/components/ServicesSection";
import FeaturedWork from "@/components/FeaturedWork";
import WhyAveniq from "@/components/WhyAveniq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";

// Page routes dynamic imports
const AboutPage = lazy(() => import("@/pages/about"));
const StartProjectPage = lazy(() => import("@/pages/start-project"));
const AdminPage = lazy(() => import("@/pages/admin"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PortfolioPage = lazy(() => import("@/pages/portfolio"));

// Service pages — lazy loaded for code-splitting
const AIAutomationPage = lazy(() => import("@/pages/services/ai-automation-development"));
const SaaSDevelopmentPage = lazy(() => import("@/pages/services/saas-development"));
const MobileAppPage = lazy(() => import("@/pages/services/mobile-app-development"));
const CustomSoftwarePage = lazy(() => import("@/pages/services/custom-software-development"));
const WebDevelopmentPage = lazy(() => import("@/pages/services/web-development-company"));
const MVPDevelopmentPage = lazy(() => import("@/pages/services/mvp-development"));
const StartupSoftwarePage = lazy(() => import("@/pages/services/startup-software-development"));
const UIUXDesignPage = lazy(() => import("@/pages/services/ui-ux-design"));

// EEAT & Governance Pages
const EditorialPolicyPage = lazy(() => import("@/pages/trust/editorial-policy"));
const SecurityPolicyPage = lazy(() => import("@/pages/trust/security-policy"));
const EngineeringStandardsPage = lazy(() => import("@/pages/trust/engineering-standards"));

// Interactive Tools
const AIRoiCalculatorPage = lazy(() => import("@/pages/tools/ai-roi-calculator"));
const SaasCostEstimatorPage = lazy(() => import("@/pages/tools/saas-cost-estimator"));

// Developer Ecosystem
const DevelopersPage = lazy(() => import("@/pages/developers/index"));

// Admin Governance
const SEODashboardPage = lazy(() => import("@/pages/admin/seo-dashboard"));

// Phase 8.5 Engineering Authority Pages
const DocsPage = lazy(() => import("@/pages/docs/index"));
const ArchitecturePage = lazy(() => import("@/pages/architecture/index"));
const PlaybooksPage = lazy(() => import("@/pages/playbooks/index"));
const IntegrationsPage = lazy(() => import("@/pages/integrations/index"));
const BestPracticesPage = lazy(() => import("@/pages/best-practices/index"));
const ProcurementPage = lazy(() => import("@/pages/procurement/index"));

// Phase 9 Technical Thought Leadership Pages
const ArticlesIndexPage = lazy(() => import("@/pages/articles/index"));
const ArticleSlugPage = lazy(() => import("@/pages/articles/[slug]"));

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    const duration = 1500; // ms
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 35) {
        setStatus("INITIALIZING SYSTEM...");
      } else if (progressPercent < 75) {
        setStatus("CONSTRUCTING CORES...");
      } else if (progressPercent < 100) {
        setStatus("LAUNCHING INTERFACE...");
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.015,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const
      }
    }
  };

  const textVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as const
      }
    })
  };

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none"
    >
      {/* Cinematic ambient background glow orb */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#6750A4]/10 blur-[120px] animate-pulse pointer-events-none" />

      {/* Brand logo letter-by-letter reveal */}
      <div className="flex overflow-hidden mb-6">
        {Array.from("Aveniq").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl md:text-7xl text-white font-serif tracking-[0.02em]"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white font-semibold"
      >
        Your Vision • Our Digital Reality
      </motion.p>

      {/* Progress indicator bar */}
      <div className="mt-12 w-60 md:w-72 h-[1.5px] rounded-full bg-white/5 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tech info status message & count */}
      <div className="mt-4.5 w-60 md:w-72 flex justify-between items-center text-[9px] font-mono tracking-widest text-white/30">
        <span>{status}</span>
        <span className="tabular-nums font-medium">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
}

function HomePage() {
  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white">
      <SEOHead
        title="Aveniq — Custom SaaS Platforms & Enterprise AI Automation Systems"
        description="Aveniq is a premium software agency building high-performance SaaS applications, custom enterprise AI agents, and RAG pipelines for startups and enterprise platforms."
        canonical="https://theaveniq.site"
        keywords="AI software development, custom SaaS development, enterprise software, AI agents, workflow automation, RAG systems, model context protocol, software engineering, Aveniq"
      />
      <BackgroundVideo />
      <BackgroundEffects />
      <Navbar />

      <main>
        <HeroSection />
        <StatsBanner />
        <ServicesSection />
        <FeaturedWork />
        <WhyAveniq />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught runtime error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center z-[9999] relative">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[#9C89D9]">Something went wrong</h2>
          <p className="text-white/50 text-sm max-w-md mb-8 leading-relaxed">
            An unexpected error occurred during rendering. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.97] transition-all cursor-pointer shadow-lg"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SimplePageLoader() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-[#9C89D9] animate-spin" />
    </div>
  );
}

import { prefetchAllCoreRoutes } from "@/utils/prefetch";

function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("aveniq_visited");
      const isAdmin = window.location.pathname.startsWith("/admin");
      if (visited || isAdmin) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    // Start prefetching core chunks in the background for zero-latency page loads
    prefetchAllCoreRoutes();

    if (!loading) return;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("aveniq_visited", "true");
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <TooltipProvider>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
        <Route path="/about">
          <Suspense fallback={<SimplePageLoader />}>
            <AboutPage />
          </Suspense>
        </Route>
        <Route path="/portfolio">
          <Suspense fallback={<SimplePageLoader />}>
            <PortfolioPage />
          </Suspense>
        </Route>
        <Route path="/book-demo">
          <Redirect to="/start-project" />
        </Route>
        <Route path="/start-project">
          <Suspense fallback={<SimplePageLoader />}>
            <StartProjectPage />
          </Suspense>
        </Route>
        <Route path="/admin">
          <Suspense fallback={<SimplePageLoader />}>
            <AdminPage />
          </Suspense>
        </Route>
        <Route path="/contact">
          <Suspense fallback={<SimplePageLoader />}>
            <ContactPage />
          </Suspense>
        </Route>

        {/* ── Service Pages ── */}
        <Route path="/ai-automation-development">
          <Suspense fallback={<SimplePageLoader />}>
            <AIAutomationPage />
          </Suspense>
        </Route>
        <Route path="/saas-development">
          <Suspense fallback={<SimplePageLoader />}>
            <SaaSDevelopmentPage />
          </Suspense>
        </Route>
        <Route path="/mobile-app-development">
          <Suspense fallback={<SimplePageLoader />}>
            <MobileAppPage />
          </Suspense>
        </Route>
        <Route path="/custom-software-development">
          <Suspense fallback={<SimplePageLoader />}>
            <CustomSoftwarePage />
          </Suspense>
        </Route>
        <Route path="/web-development-company">
          <Suspense fallback={<SimplePageLoader />}>
            <WebDevelopmentPage />
          </Suspense>
        </Route>
        <Route path="/mvp-development">
          <Suspense fallback={<SimplePageLoader />}>
            <MVPDevelopmentPage />
          </Suspense>
        </Route>
        <Route path="/startup-software-development">
          <Suspense fallback={<SimplePageLoader />}>
            <StartupSoftwarePage />
          </Suspense>
        </Route>
        <Route path="/ui-ux-design">
          <Suspense fallback={<SimplePageLoader />}>
            <UIUXDesignPage />
          </Suspense>
        </Route>

        {/* ── EEAT & Trust Pages ── */}
        <Route path="/trust/editorial-policy">
          <Suspense fallback={<SimplePageLoader />}>
            <EditorialPolicyPage />
          </Suspense>
        </Route>
        <Route path="/trust/security-policy">
          <Suspense fallback={<SimplePageLoader />}>
            <SecurityPolicyPage />
          </Suspense>
        </Route>
        <Route path="/trust/engineering-standards">
          <Suspense fallback={<SimplePageLoader />}>
            <EngineeringStandardsPage />
          </Suspense>
        </Route>

        {/* ── Interactive Value Tools ── */}
        <Route path="/tools/ai-roi-calculator">
          <Suspense fallback={<SimplePageLoader />}>
            <AIRoiCalculatorPage />
          </Suspense>
        </Route>
        <Route path="/tools/saas-cost-estimator">
          <Suspense fallback={<SimplePageLoader />}>
            <SaasCostEstimatorPage />
          </Suspense>
        </Route>

        {/* ── Developer Ecosystem Hub ── */}
        <Route path="/developers">
          <Suspense fallback={<SimplePageLoader />}>
            <DevelopersPage />
          </Suspense>
        </Route>

        {/* ── Admin SEO & Intelligence Dashboard ── */}
        <Route path="/admin/seo-dashboard">
          <Suspense fallback={<SimplePageLoader />}>
            <SEODashboardPage />
          </Suspense>
        </Route>

        {/* ── Phase 8.5 Engineering Authority Routes ── */}
        <Route path="/docs">
          <Suspense fallback={<SimplePageLoader />}>
            <DocsPage />
          </Suspense>
        </Route>
        <Route path="/architecture">
          <Suspense fallback={<SimplePageLoader />}>
            <ArchitecturePage />
          </Suspense>
        </Route>
        <Route path="/playbooks">
          <Suspense fallback={<SimplePageLoader />}>
            <PlaybooksPage />
          </Suspense>
        </Route>
        <Route path="/integrations">
          <Suspense fallback={<SimplePageLoader />}>
            <IntegrationsPage />
          </Suspense>
        </Route>
        <Route path="/best-practices">
          <Suspense fallback={<SimplePageLoader />}>
            <BestPracticesPage />
          </Suspense>
        </Route>
        <Route path="/procurement">
          <Suspense fallback={<SimplePageLoader />}>
            <ProcurementPage />
          </Suspense>
        </Route>

        {/* ── Phase 9 Technical Thought Leadership Routes ── */}
        <Route path="/articles">
          <Suspense fallback={<SimplePageLoader />}>
            <ArticlesIndexPage />
          </Suspense>
        </Route>
        <Route path="/articles/:slug">
          <Suspense fallback={<SimplePageLoader />}>
            <ArticleSlugPage />
          </Suspense>
        </Route>
      </Switch>
      </ErrorBoundary>

      <Toaster />
    </TooltipProvider>
  );
}

export default App;