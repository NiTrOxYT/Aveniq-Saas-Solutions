import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";

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

import BookDemoPage from "@/pages/book-demo";

const queryClient = new QueryClient();

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="relative mb-8">
        <div className="h-24 w-24 rounded-full border border-[#6750A4]/20" />
        <div className="absolute inset-0 h-24 w-24 rounded-full border-t-2 border-[#9C89D9] animate-spin" />
      </div>

      <h1
        className="text-5xl md:text-7xl text-white"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Aveniq
      </h1>

      <p className="mt-4 text-white/50 tracking-[0.3em] uppercase text-xs">
        Your Vision • Our Digital Reality
      </p>

      <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-[#6750A4] to-[#9C89D9]" />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white">
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {loading && <LoadingScreen />}
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/book-demo" component={BookDemoPage} />
        </Switch>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;