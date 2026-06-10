import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";

import BackgroundVideo from "@/components/BackgroundVideo";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedWork from "@/components/FeaturedWork";
import WhyAveniq from "@/components/WhyAveniq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

import BookDemoPage from "@/pages/book-demo";

const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white">
      <BackgroundVideo />
      <BackgroundEffects />
      <Navbar />

      <main>
        <HeroSection />
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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