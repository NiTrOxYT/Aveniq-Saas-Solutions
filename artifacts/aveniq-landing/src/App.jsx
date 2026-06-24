import { useEffect, useState, lazy, Suspense } from "react";
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
// Page routes dynamic imports
const StartProjectPage = lazy(() => import("@/pages/start-project"));
const AdminPage = lazy(() => import("@/pages/admin"));
const ContactPage = lazy(() => import("@/pages/contact"));
function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("INITIALIZING SYSTEM...");
    useEffect(() => {
        const duration = 1500; // ms
        const startTime = performance.now();
        const updateProgress = (now) => {
            const elapsed = now - startTime;
            const progressPercent = Math.min((elapsed / duration) * 100, 100);
            setProgress(progressPercent);
            if (progressPercent < 35) {
                setStatus("INITIALIZING SYSTEM...");
            }
            else if (progressPercent < 75) {
                setStatus("CONSTRUCTING CORES...");
            }
            else if (progressPercent < 100) {
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
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };
    const textVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
            }
        })
    };
    return (<motion.div variants={containerVariants} exit="exit" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none">
      {/* Cinematic ambient background glow orb */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#6750A4]/10 blur-[120px] animate-pulse pointer-events-none"/>

      {/* Brand logo letter-by-letter reveal */}
      <div className="flex overflow-hidden mb-6">
        {Array.from("Aveniq").map((letter, i) => (<motion.span key={i} custom={i} initial="hidden" animate="visible" variants={textVariants} className="text-5xl md:text-7xl text-white font-serif tracking-[0.02em]">
            {letter}
          </motion.span>))}
      </div>

      {/* Tagline */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white font-semibold">
        Your Vision • Our Digital Reality
      </motion.p>

      {/* Progress indicator bar */}
      <div className="mt-12 w-60 md:w-72 h-[1.5px] rounded-full bg-white/5 overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] transition-all duration-75 ease-out" style={{ width: `${progress}%` }}/>
      </div>

      {/* Tech info status message & count */}
      <div className="mt-4.5 w-60 md:w-72 flex justify-between items-center text-[9px] font-mono tracking-widest text-white/30">
        <span>{status}</span>
        <span className="tabular-nums font-medium">{Math.round(progress)}%</span>
      </div>
    </motion.div>);
}
function HomePage() {
    return (<div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white">
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
    </div>);
}
function SimplePageLoader() {
    return (<div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-[#9C89D9] animate-spin"/>
    </div>);
}
function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Skip loading screen on direct /admin visits for snappier CMS workflow
        if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
            setLoading(false);
            return;
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);
    return (<TooltipProvider>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <Switch>
        <Route path="/" component={HomePage}/>
        <Route path="/book-demo">
          <Redirect to="/start-project"/>
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
      </Switch>

      <Toaster />
    </TooltipProvider>);
}
export default App;
