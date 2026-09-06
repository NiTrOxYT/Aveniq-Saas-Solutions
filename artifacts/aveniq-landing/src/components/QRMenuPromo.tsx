import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, QrCode } from "lucide-react";
import { Link, useLocation } from "wouter";
import { prefetchRoute } from "@/utils/prefetch";
import { PhoneMenuMockup } from "@/components/qr-menu/PhoneMenuMockup";

export default function QRMenuPromo() {
  const reduce = useReducedMotion();
  const [, navigate] = useLocation();
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cores = navigator.hardwareConcurrency || 8;
      const memory = (navigator as any).deviceMemory || 8;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsLowPower(prefersReduced || cores <= 4 || memory <= 4 || isMobile);
    }
  }, []);

  return (
    <section
      id="qr-menu-promo"
      className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 bg-[#F7F3EC] text-[#332A24] border-t border-[#E4DBCF] overflow-hidden"
    >
      {/* Warm ambient textures & light table wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full opacity-60 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #EFE7DA 0%, #F5EBE1 60%, transparent 80%)",
          }}
        />
        <div
          className="absolute -bottom-24 left-10 w-[500px] h-[500px] rounded-full opacity-50 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #EADBCE 0%, #F7F3EC 70%, transparent 90%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT: Warm Editorial Copy ── */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Small Eyebrow */}
            <motion.div
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E4DBCF] bg-[#FFFDF8] shadow-xs mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#C98F6B]" />
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#766A5F]">
                AVENIQ QR MENU
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.12] tracking-tight text-[#332A24] mb-6 font-serif max-w-xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Your Café Deserves More Than a{" "}
              <span className="italic text-[#9A6548] font-normal">
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
              className="text-[#766A5F] text-base sm:text-lg font-light leading-relaxed mb-8 max-w-lg"
            >
              Turn your menu into a digital experience. Let customers discover your offerings from their phones while you update prices, items and specials without reprinting a single menu.
            </motion.p>

            {/* 3 Tactile Café Pillars */}
            <motion.div
              initial={isLowPower ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 w-full max-w-lg"
            >
              <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs">
                <div className="text-[#9A6548] text-xs font-mono mb-1">01</div>
                <div className="text-xs font-medium text-[#332A24]">Instant Updates</div>
                <div className="text-[11px] text-[#766A5F] font-light mt-0.5">Edit prices anytime</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs">
                <div className="text-[#9A6548] text-xs font-mono mb-1">02</div>
                <div className="text-xs font-medium text-[#332A24]">No App Required</div>
                <div className="text-[11px] text-[#766A5F] font-light mt-0.5">Scans instantly in browser</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs">
                <div className="text-[#9A6548] text-xs font-mono mb-1">03</div>
                <div className="text-xs font-medium text-[#332A24]">Warm Aesthetic</div>
                <div className="text-[11px] text-[#766A5F] font-light mt-0.5">Designed like your café</div>
              </div>
            </motion.div>

            {/* CTA Group */}
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
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-medium text-[#FFFDF8] bg-[#9A6548] hover:bg-[#855439] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/15"
              >
                <span>Explore Aveniq QR Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <span className="text-xs text-[#766A5F] font-mono tracking-wide">
                Built for modern cafés & roasteries
              </span>
            </motion.div>

            {/* Bottom Subtitle */}
            <p className="text-xs text-[#766A5F]/80 font-light mt-6 tracking-wide">
              Simple for owners. Beautiful for customers. Built to grow.
            </p>
          </div>

          {/* ── RIGHT: Warm Café Tabletop Scene ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
            
            {/* Table Surface Card Container */}
            <div className="relative w-full max-w-[460px] p-6 sm:p-8 rounded-3xl bg-[#EFE7DA]/80 border border-[#E4DBCF] shadow-xl shadow-[#332A24]/5 overflow-hidden">
              
              {/* Linen napkin texture & cup illustration */}
              <div className="absolute top-4 right-4 flex items-center gap-3 pointer-events-none opacity-90">
                {/* Ceramic Coffee Cup with Latte Art */}
                <div className="w-14 h-14 rounded-full bg-[#FFFDF8] border-4 border-[#E4DBCF] shadow-md flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-[#9A6548] flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#FFFDF8]/90 flex items-center justify-center text-[10px] text-[#9A6548]">
                      ☕
                    </div>
                  </div>
                  <div className="absolute -right-2 top-3 w-3 h-5 rounded-r-md border-2 border-l-0 border-[#E4DBCF]" />
                </div>
              </div>

              {/* Table QR Standee Card Mockup */}
              <div className="mb-6 p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-sm flex items-center justify-between max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F3EC] p-1.5 flex items-center justify-center shrink-0 border border-[#E4DBCF]">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-[#332A24] fill-current">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0-4h2v2h-2v-2zm-6-2h2v2H8v-2zm-2 2h2v2H6v-2zm2 2h2v2H8v-2zm-4 0h2v2H4v-2zm10-6h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#9A6548] font-semibold uppercase block">Table 04</span>
                    <span className="text-xs font-serif text-[#332A24] font-medium block leading-tight">Scan to explore</span>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#89947B]/15 text-[#626e55] font-mono font-medium">
                  Active
                </span>
              </div>

              {/* Interactive Smartphone Mockup */}
              <PhoneMenuMockup layoutIdPrefix="qr-promo-hero" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
