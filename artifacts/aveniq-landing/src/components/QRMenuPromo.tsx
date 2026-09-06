import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, QrCode, Sparkles, Zap, Smartphone, CheckCircle2, SlidersHorizontal, Eye } from "lucide-react";
import { Link, useLocation } from "wouter";
import { prefetchRoute } from "@/utils/prefetch";

export default function QRMenuPromo() {
  const reduce = useReducedMotion();
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState("Espresso");
  const [isLowPower, setIsLowPower] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cores = navigator.hardwareConcurrency || 8;
      const memory = (navigator as any).deviceMemory || 8;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsLowPower(prefersReduced || cores <= 4 || memory <= 4 || isMobile);
    }
  }, []);

  const menuCategories = ["Espresso", "Cold Brew", "Bakery", "Brunch"];

  return (
    <section
      id="qr-menu-promo"
      ref={containerRef}
      className="py-28 md:py-36 px-4 sm:px-6 relative z-10 bg-[#020203] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Ambient background glow matching Aveniq brand lavender & purple */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(103,80,164,0.3) 0%, rgba(156,137,217,0.1) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(156,137,217,0.25) 0%, rgba(103,80,164,0.05) 60%, transparent 70%)",
          }}
        />
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Value Proposition & Copy ── */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Eyebrow badge with MVP indicator */}
            <motion.div
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9] animate-pulse" style={{ boxShadow: "0 0 8px #9C89D9" }} />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-white/70">
                AVENIQ QR MENU
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="px-2 py-0.5 rounded-md bg-[#6750A4]/25 border border-[#9C89D9]/30 text-[#C4B5FD] text-[9px] font-mono font-bold tracking-wider uppercase">
                NOW IN MVP
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6 font-serif max-w-xl"
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.025em" }}
            >
              Your Café Deserves More Than a{" "}
              <span className="italic bg-gradient-to-r from-white via-[#EADFFF] to-[#9C89D9] bg-clip-text text-transparent">
                Printed Menu
              </span>
              .
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-lg"
            >
              Turn your menu into a digital experience. Let customers discover your offerings from their phones while you update prices, items and specials without reprinting a single menu.
            </motion.p>

            {/* Value Highlights Grid */}
            <motion.div
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 w-full max-w-lg"
            >
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/40 border border-white/[0.05]">
                <div className="p-1.5 rounded-md bg-[#6750A4]/20 text-[#9C89D9] shrink-0 mt-0.5">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">Zero-App Friction</h4>
                  <p className="text-white/45 text-[11px] leading-tight mt-0.5">Instant browser scan, 0 downloads</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/40 border border-white/[0.05]">
                <div className="p-1.5 rounded-md bg-[#6750A4]/20 text-[#9C89D9] shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">Instant Updates</h4>
                  <p className="text-white/45 text-[11px] leading-tight mt-0.5">Modify prices & 86 items in real-time</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/40 border border-white/[0.05]">
                <div className="p-1.5 rounded-md bg-[#6750A4]/20 text-[#9C89D9] shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">Visual Upsells</h4>
                  <p className="text-white/45 text-[11px] leading-tight mt-0.5">High-res photos & dietary filters</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/40 border border-white/[0.05]">
                <div className="p-1.5 rounded-md bg-[#6750A4]/20 text-[#9C89D9] shrink-0 mt-0.5">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">Custom QR Stands</h4>
                  <p className="text-white/45 text-[11px] leading-tight mt-0.5">Branded tabletop displays included</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs and Supporting note */}
            <motion.div
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
            >
              <Link
                href="/qr-menu"
                onMouseEnter={() => prefetchRoute("/qr-menu")}
                onFocus={() => prefetchRoute("/qr-menu")}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-lg shadow-[#6750A4]/20 hover:shadow-[#6750A4]/35"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9]" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#7B63C0] to-[#ADA0E8]" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Aveniq QR Menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>

              <span className="text-xs text-white/40 font-mono tracking-wide">
                Built for modern cafés & specialty roasters
              </span>
            </motion.div>

            {/* Subtle bottom tagline */}
            <p className="text-xs text-white/35 font-light mt-6 tracking-wide">
              Simple for owners. Beautiful for customers. Built to grow.
            </p>
          </div>

          {/* ── RIGHT COLUMN: Realistic Phone Mockup & Ecosystem ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Outer Glow Halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#6750A4]/15 blur-3xl pointer-events-none -z-10" />

            {/* ── Realistic Smartphone Frame ── */}
            <motion.div
              initial={isLowPower ? { opacity: 1, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-[44px] p-3 bg-gradient-to-b from-[#2a2833] via-[#17161c] to-[#0d0c11] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              {/* Phone Inner Bezel */}
              <div className="relative rounded-[36px] overflow-hidden bg-[#0a0a0d] border border-white/[0.08] shadow-inner">
                
                {/* Status Bar & Dynamic Island */}
                <div className="h-10 bg-[#0a0a0d] px-6 flex items-center justify-between text-[10px] text-white/60 font-mono select-none pt-1">
                  <span>9:41</span>
                  {/* Dynamic Island */}
                  <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C89D9]" />
                    <span className="text-[7px] text-white/40 tracking-wider font-mono">AVENIQ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px]">5G</span>
                    <div className="w-4 h-2 border border-white/40 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-white/70 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Café App Screen Content */}
                <div className="p-4 space-y-4 pb-6 select-none">
                  
                  {/* Café Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#9C89D9] font-medium block">
                        Digital Menu
                      </span>
                      <h3 className="text-white text-base font-semibold tracking-tight" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.25rem" }}>
                        L'Aura Specialty Roasters
                      </h3>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      <span className="text-[9px] text-[#10b981] font-mono font-medium">Table 04</span>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {menuCategories.map((category) => {
                      const isActive = activeCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                            isActive
                              ? "bg-[#6750A4] text-white shadow-sm shadow-[#6750A4]/40"
                              : "bg-white/[0.04] text-white/50 hover:text-white/80 border border-white/[0.04]"
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>

                  {/* Menu Item Cards */}
                  <div className="space-y-2.5">
                    
                    {/* Item 1: Velvet Oat Flat White */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] hover:border-[#6750A4]/40 transition-colors flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6750A4]/20 to-transparent" />
                        <span className="text-xl">☕</span>
                        <span className="text-[7px] font-mono text-[#C4B5FD] mt-0.5">TOP PICK</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white text-xs font-semibold truncate">Velvet Oat Flat White</h4>
                          <span className="text-white font-mono text-xs font-bold">$5.50</span>
                        </div>
                        <p className="text-white/45 text-[10px] line-clamp-1 mt-0.5 font-light">
                          Ethiopian Yirgacheffe, steamed silky oat milk
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-white/50">Double Shot</span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[#10b981]">Vegan</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Cardamom Pistachio Cruffin */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] hover:border-[#6750A4]/40 transition-colors flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#9C89D9]/20 to-transparent" />
                        <span className="text-xl">🥐</span>
                        <span className="text-[7px] font-mono text-[#10b981] mt-0.5">FRESH</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white text-xs font-semibold truncate">Pistachio Cruffin</h4>
                          <span className="text-white font-mono text-xs font-bold">$6.50</span>
                        </div>
                        <p className="text-white/45 text-[10px] line-clamp-1 mt-0.5 font-light">
                          72-layer laminated pastry, spiced pistachio cream
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-white/50">Artisan Bakery</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 3: Nitro Cold Drip */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] hover:border-[#6750A4]/40 transition-colors flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-lg bg-zinc-800/80 border border-white/[0.06] flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6750A4]/20 to-transparent" />
                        <span className="text-xl">🧊</span>
                        <span className="text-[7px] font-mono text-white/40 mt-0.5">SLOW DRIP</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white text-xs font-semibold truncate">Cold Drip Reserve</h4>
                          <span className="text-white font-mono text-xs font-bold">$7.00</span>
                        </div>
                        <p className="text-white/45 text-[10px] line-clamp-1 mt-0.5 font-light">
                          18h Kyoto slow-drip, notes of bergamot & jasmine
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-white/50">Single Origin</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Mini Bottom Order Bar */}
                  <div className="pt-1">
                    <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#6750A4]/90 to-[#9C89D9]/90 text-white flex items-center justify-between text-xs font-semibold shadow-md">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-[#EADFFF]" />
                        Explore Full Menu
                      </span>
                      <span className="text-[10px] font-mono bg-black/25 px-2 py-0.5 rounded-full">
                        24 Items
                      </span>
                    </div>
                  </div>

                </div>

                {/* Home Indicator Bar */}
                <div className="h-4 bg-[#0a0a0d] flex items-center justify-center">
                  <div className="w-24 h-1 bg-white/20 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* ── FLOATING COMPANION CARDS ── */}

            {/* Card 1: Top-Right Table QR Code Stand Mockup */}
            <motion.div
              initial={isLowPower ? { opacity: 1 } : { opacity: 0, x: 25, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute -top-6 -right-4 sm:-right-8 z-20 w-44 sm:w-52 p-3.5 rounded-2xl border border-white/10 bg-[#09090c]/95 backdrop-blur-xl shadow-2xl shadow-black/80 hidden sm:block"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-inner">
                  {/* Clean SVG QR Code Representation */}
                  <svg viewBox="0 0 24 24" className="w-full h-full text-black fill-current">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0-4h2v2h-2v-2zm-6-2h2v2H8v-2zm-2 2h2v2H6v-2zm2 2h2v2H8v-2zm-4 0h2v2H4v-2zm10-6h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#9C89D9] font-semibold uppercase block">Table Display</span>
                  <span className="text-white text-xs font-semibold block leading-tight">Scan to Browse</span>
                </div>
              </div>
              <div className="text-[10px] text-white/50 leading-tight border-t border-white/[0.06] pt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#10b981] shrink-0" />
                <span>Instant loading in &lt;100ms</span>
              </div>
            </motion.div>

            {/* Card 2: Bottom-Left Live Telemetry & Quick Updates Pill */}
            <motion.div
              initial={isLowPower ? { opacity: 1 } : { opacity: 0, x: -25, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 z-20 w-48 sm:w-56 p-3.5 rounded-2xl border border-white/10 bg-[#09090c]/95 backdrop-blur-xl shadow-2xl shadow-black/80"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded bg-[#6750A4]/20 text-[#9C89D9]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </span>
                <span className="text-white text-xs font-semibold">Live Menu Control</span>
              </div>
              <p className="text-white/50 text-[10px] leading-tight">
                Update prices, mark specials, or 86 sold-out dishes instantly without touching print.
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[9px] font-mono text-white/40 border-t border-white/[0.06] pt-1.5">
                <span className="text-[#10b981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  Synced
                </span>
                <span>Zero Downtime</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
