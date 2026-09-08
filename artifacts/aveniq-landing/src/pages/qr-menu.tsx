import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, QrCode, Check, Coffee } from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { PhoneMenuMockup } from "@/components/qr-menu/PhoneMenuMockup";
import { BotanicalDecorations } from "@/components/qr-menu/BotanicalDecorations";

export default function QRMenuPage() {
  const [, navigate] = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToPreview = () => {
    const el = document.getElementById("interactive-preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#F7F3EC] text-[#332A24] min-h-screen selection:bg-[#EADBCE] selection:text-[#332A24] overflow-x-hidden">
      <SEOHead
        title="Aveniq QR Menu — Beautiful Digital Menus for Modern Cafés"
        description="Turn your printed menu into a warm, modern digital experience. Let guests browse and order from their phones while you update your menu anytime without reprinting."
        canonical="https://theaveniq.site/qr-menu"
        keywords="Aveniq QR menu, café digital menu, coffee shop menu, restaurant QR code, contactless table ordering, boutique hospitality"
      />

      {/* Navbar Container */}
      <div className="relative z-50">
        <Navbar theme="light" />
      </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        {/* Botanical Flower & Leaf Branches on both sides */}
        <BotanicalDecorations />

        {/* Soft background morning light aura */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-10 right-1/3 w-[700px] h-[700px] rounded-full opacity-60 blur-[140px]"
            style={{
              background: "radial-gradient(circle, #EFE7DA 0%, #F5EBE1 60%, transparent 80%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Hero Column */}
            <div className="lg:col-span-6 flex flex-col items-start">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E4DBCF] bg-[#FFFDF8] shadow-xs mb-8">
                <span className="w-2 h-2 rounded-full bg-[#C98F6B]" />
                <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#766A5F]">
                  AVENIQ QR MENU
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.08] tracking-tight text-[#332A24] mb-6 font-serif"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Your Café Deserves <br className="hidden sm:inline" />
                a Menu as Warm <br className="hidden sm:inline" />
                <span className="italic text-[#9A6548] font-normal">
                  as Your Coffee
                </span>
                .
              </h1>

              {/* Supporting Copy */}
              <p className="text-[#766A5F] text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-xl">
                Turn your printed menu into a beautiful digital experience. Let guests browse, discover and order from their phones — while you update your menu anytime.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={scrollToPreview}
                  className="px-8 py-3.5 rounded-full bg-[#9A6548] hover:bg-[#855439] text-[#FFFDF8] font-medium text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/15 text-center flex items-center justify-center gap-2"
                >
                  Explore the Menu
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/start-project"
                  className="px-8 py-3.5 rounded-full border border-[#E4DBCF] hover:border-[#9A6548]/40 bg-[#FFFDF8] text-[#332A24] font-medium text-sm transition-colors text-center shadow-xs"
                >
                  Book A Free Demo
                </Link>
              </div>

            </div>

            {/* Right Hero Column: Café Table Scene */}
            <div className="lg:col-span-6 relative flex items-center justify-center">

              {/* Table Surface Card */}
              <div className="relative w-full max-w-[480px] p-6 sm:p-8 rounded-3xl bg-[#EFE7DA]/90 border border-[#E4DBCF] shadow-xl shadow-[#332A24]/5">

                {/* Top Scene Accessories: Ceramic Cup & Table Stand */}
                <div className="flex items-center justify-between mb-6">

                  {/* Table Standee Mockup */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F7F3EC] p-1.5 flex items-center justify-center border border-[#E4DBCF]">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-[#332A24] fill-current">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0-4h2v2h-2v-2zm-6-2h2v2H8v-2zm-2 2h2v2H6v-2zm2 2h2v2H8v-2zm-4 0h2v2H4v-2zm10-6h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#9A6548] font-semibold uppercase block">Table 04</span>
                      <span className="text-xs font-serif text-[#332A24] font-medium block">Scan to explore</span>
                    </div>
                  </div>

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

                {/* Interactive Phone Mockup */}
                <PhoneMenuMockup layoutIdPrefix="qr-page-hero" />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 2. THREE MINIMAL FEATURES SECTION ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#EFE7DA]/60">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#332A24] font-serif"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Made for the way cafés actually work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

            {/* 01 */}
            <div className="p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-serif text-[#9A6548] block mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  01
                </span>
                <h3 className="text-xs font-mono font-semibold tracking-[0.15em] uppercase text-[#332A24] mb-3">
                  UPDATE ANYTIME
                </h3>
                <p className="text-[#766A5F] text-sm leading-relaxed font-light">
                  Change prices, items and specials without printing again. Adjust seasonal batches or 86 sold-out pastries in 1 click.
                </p>
              </div>
            </div>

            {/* 02 */}
            <div className="p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-serif text-[#9A6548] block mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  02
                </span>
                <h3 className="text-xs font-mono font-semibold tracking-[0.15em] uppercase text-[#332A24] mb-3">
                  BEAUTIFUL BY DEFAULT
                </h3>
                <p className="text-[#766A5F] text-sm leading-relaxed font-light">
                  A menu designed to make food look as good as it tastes. Clean typography, high-res photography, and tactile café aesthetics.
                </p>
              </div>
            </div>

            {/* 03 */}
            <div className="p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-serif text-[#9A6548] block mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  03
                </span>
                <h3 className="text-xs font-mono font-semibold tracking-[0.15em] uppercase text-[#332A24] mb-3">
                  ONE SCAN AWAY
                </h3>
                <p className="text-[#766A5F] text-sm leading-relaxed font-light">
                  Guests simply scan, browse and discover. Instant mobile loading in &lt;100ms with 0 app downloads or account friction.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. SECOND VISUAL SECTION: Less printing. More discovering. ── */}
      <section id="interactive-preview" className="py-24 sm:py-32 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Editorial Menu Card Visual */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#EFE7DA] border border-[#E4DBCF] shadow-sm">

                <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs space-y-5">
                  {/* Menu Item Image */}
                  <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-[#E4DBCF] bg-[#EFE7DA] group">
                    <img
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                      alt="Ethiopian Yirgacheffe G1 Filter Coffee"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#332A24]/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FFFDF8]/90 backdrop-blur-xs text-[#9A6548] text-[10px] font-mono font-medium border border-[#E4DBCF]/80 shadow-xs">
                      Single Origin Batch
                    </div>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-serif italic drop-shadow-sm">
                      Kochere 2,100m Heirloom
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E4DBCF] pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#9A6548] block">Specialty Roaster Batch</span>
                      <h4 className="text-xl sm:text-2xl font-serif text-[#332A24]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        Ethiopian Yirgacheffe G1
                      </h4>
                    </div>
                    <span className="text-base font-mono font-medium text-[#332A24]">₹240</span>
                  </div>

                  <p className="text-xs text-[#766A5F] leading-relaxed font-light">
                    Direct trade heirloom beans grown at 2,100m in Kochere. Hand-washed and slow-dried on African raised beds. Tasting notes of bergamot, candied lemon, and delicate jasmine honey.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#EFE7DA] text-[#766A5F]">Single Origin</span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#EFE7DA] text-[#766A5F]">Filter Roast</span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#89947B]/15 text-[#626e55]">Oat Milk Available</span>
                  </div>

                  <div className="pt-2 border-t border-[#E4DBCF] flex items-center justify-between text-xs">
                    <span className="text-[#766A5F]">Pairs well with Butter Croissant</span>
                    <span className="text-[#9A6548] font-medium">Seasonal Crop Release</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Editorial Copy & Bullet List */}
            <div className="lg:col-span-6 flex flex-col items-start">

              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.12] tracking-tight text-[#332A24] mb-6 font-serif"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Less printing. <br />
                <span className="italic text-[#9A6548] font-normal">More discovering</span>.
              </h2>

              <p className="text-[#766A5F] text-base sm:text-lg font-light leading-relaxed mb-8 max-w-lg">
                Your menu changes. Your customers change. Your digital menu should be able to keep up.
              </p>

              {/* Minimal Line Checklist */}
              <div className="space-y-4 w-full max-w-md mb-8">
                {[
                  "Update menu items instantly",
                  "Highlight today's specials",
                  "Add photos and descriptions",
                  "Keep every table up to date",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-[#332A24] font-light">
                    <div className="w-5 h-5 rounded-full bg-[#EFE7DA] border border-[#E4DBCF] flex items-center justify-center text-[#9A6548] shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#9A6548] hover:text-[#855439] group"
              >
                Get started with Aveniq QR Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ── 4. QR EXPERIENCE SECTION: One small QR. A better table experience. ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#EFE7DA]/50">
        <div className="max-w-4xl mx-auto text-center">

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#332A24] mb-6 font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            One small QR. <br />
            <span className="italic text-[#9A6548] font-normal">A better table experience</span>.
          </h2>

          <p className="text-[#766A5F] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
            No messy plastic laminated binders or stained sheets. Just a clean, minimal wooden or brass tabletop card.
          </p>

          {/* Minimal Physical Tabletop QR Card */}
          <div className="max-w-xs mx-auto p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-lg shadow-[#332A24]/5 space-y-5">
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#766A5F]">
              TABLE 04
            </div>

            {/* Crisp Minimal QR Code */}
            <div className="w-36 h-36 mx-auto bg-[#F7F3EC] p-3 rounded-2xl border border-[#E4DBCF] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#332A24] fill-current">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0-4h2v2h-2v-2zm-6-2h2v2H8v-2zm-2 2h2v2H6v-2zm2 2h2v2H8v-2zm-4 0h2v2H4v-2zm10-6h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2z" />
              </svg>
            </div>

            <div>
              <div className="text-base font-serif text-[#332A24]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Scan to explore
              </div>
              <div className="text-[11px] text-[#766A5F] font-light mt-0.5">
                morning & co. digital menu
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FINAL WARM CTA SECTION ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#F7F3EC] text-center">
        <div className="max-w-3xl mx-auto">

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.12] tracking-tight text-[#332A24] mb-6 font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ready to give your menu <br />
            <span className="italic text-[#9A6548] font-normal">a little more room to grow</span>?
          </h2>

          <p className="text-[#766A5F] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            Join boutique roasteries and cafés using Aveniq QR Menu. Simple setup, zero maintenance, and custom branded table displays.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => navigate("/start-project")}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#9A6548] hover:bg-[#855439] text-[#FFFDF8] font-medium text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/15 flex items-center justify-center gap-2"
            >
              Talk to Aveniq →
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-full border border-[#E4DBCF] hover:border-[#9A6548]/40 bg-[#FFFDF8] text-[#332A24] font-medium text-sm transition-colors text-center shadow-xs"
            >
              Contact Team
            </Link>
          </div>

          <p className="text-xs text-[#766A5F] font-mono tracking-wide">
            Simple for owners. Beautiful for guests.
          </p>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
