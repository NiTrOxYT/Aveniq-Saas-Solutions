import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, QrCode, Sparkles, Smartphone, CheckCircle2, SlidersHorizontal, Layers, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function QRMenuPage() {
  const [, navigate] = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-white selection:bg-[#6750A4] selection:text-white">
      <SEOHead
        title="Aveniq QR Menu — Modern Digital Menu MVP for Cafés & Restaurants"
        description="Transform your café menu into an engaging digital experience. Instant scan, real-time item updates, high-resolution visual storytelling, and zero app installs."
        canonical="https://theaveniq.site/qr-menu"
        keywords="Aveniq QR menu, café digital menu, restaurant QR code, digital menu MVP, contactless ordering, specialty coffee menu"
      />
      <Navbar />

      {/* Hero Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-[140px]"
          style={{
            background: "radial-gradient(circle, rgba(103,80,164,0.4) 0%, rgba(156,137,217,0.15) 50%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
      </div>

      <main className="relative z-10 pt-36 md:pt-44 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-white/70">
              AVENIQ PRODUCT SUITE
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="px-2 py-0.5 rounded-md bg-[#6750A4]/25 border border-[#9C89D9]/30 text-[#C4B5FD] text-[9px] font-mono font-bold tracking-wider uppercase">
              EARLY ACCESS MVP
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-white mb-6 font-serif"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.03em" }}
          >
            Your Café Deserves More Than a{" "}
            <span className="italic bg-gradient-to-r from-white via-[#EADFFF] to-[#9C89D9] bg-clip-text text-transparent">
              Printed Menu
            </span>
            .
          </h1>

          <p className="text-white/60 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Aveniq QR Menu is our early-stage dedicated digital menu system engineered specifically for boutique cafés, artisan roasteries, and progressive restaurants.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => navigate("/start-project")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer shadow-lg shadow-[#6750A4]/25 flex items-center justify-center gap-2"
            >
              Request Early Access Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-colors text-center"
            >
              Speak with Product Team
            </Link>
          </div>

          {/* 3 Core MVP Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-sm">
              <div className="p-2.5 rounded-xl bg-[#6750A4]/20 text-[#9C89D9] w-fit mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">Instant Web Experience</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Customers scan the table QR code and the menu opens in under 100ms on mobile Safari or Chrome. No downloads, logins, or app store barriers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-sm">
              <div className="p-2.5 rounded-xl bg-[#6750A4]/20 text-[#9C89D9] w-fit mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">Real-Time Inventory & 86 Sync</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Out of single-origin beans or today's seasonal croissant? Mark items unavailable or adjust pricing in 1 click from your owner dashboard.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.06] bg-zinc-950/50 backdrop-blur-sm">
              <div className="p-2.5 rounded-xl bg-[#6750A4]/20 text-[#9C89D9] w-fit mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">Visual Upselling Engine</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">
                Showcase high-resolution photography, roaster tasting notes, milk substitution modifiers, and pairings to increase average order size by up to 28%.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
