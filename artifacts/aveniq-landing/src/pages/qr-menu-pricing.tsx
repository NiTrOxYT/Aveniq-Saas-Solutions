import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  Coffee, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Layers, 
  HelpCircle,
  QrCode,
  Zap,
  TrendingDown,
  Gift
} from "lucide-react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BotanicalDecorations } from "@/components/qr-menu/BotanicalDecorations";

interface DurationOption {
  id: "1m" | "3m" | "6m" | "12m";
  label: string;
  months: number;
  days: number;
  ratePerTablePerDay: number;
  badge?: string;
  isPopular?: boolean;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: "1m",
    label: "1 Month",
    months: 1,
    days: 30,
    ratePerTablePerDay: 9,
    badge: "Flexible",
  },
  {
    id: "3m",
    label: "3 Months",
    months: 3,
    days: 90,
    ratePerTablePerDay: 8,
    badge: "Save 11%",
  },
  {
    id: "6m",
    label: "6 Months",
    months: 6,
    days: 180,
    ratePerTablePerDay: 7.5,
    badge: "Save 17%",
    isPopular: true,
  },
  {
    id: "12m",
    label: "12 Months",
    months: 12,
    days: 365,
    ratePerTablePerDay: 6,
    badge: "Best Value • 33% Off",
  },
];

const PRESET_TABLES = [5, 10, 15, 20, 30, 50];

const ONE_TIME_SETUP_FEE = 1499; // Standard one-time custom standees & menu digitalization setup

export default function QRMenuPricingPage() {
  const [, navigate] = useLocation();
  const [tableCount, setTableCount] = useState<number>(10);
  const [selectedDurationId, setSelectedDurationId] = useState<"1m" | "3m" | "6m" | "12m">("6m");
  const [includeHardwareStands, setIncludeHardwareStands] = useState<boolean>(true);

  const selectedDuration = useMemo(
    () => DURATION_OPTIONS.find((opt) => opt.id === selectedDurationId) || DURATION_OPTIONS[2],
    [selectedDurationId]
  );

  // Baseline 1-month calculation (at standard ₹9/day rate for 30 days)
  const oneMonthBaselinePrice = useMemo(() => {
    return Math.round(tableCount * 9 * 30);
  }, [tableCount]);

  // Selected duration total subscription calculation
  const calculatedPlanPrice = useMemo(() => {
    return Math.round(tableCount * selectedDuration.ratePerTablePerDay * selectedDuration.days);
  }, [tableCount, selectedDuration]);

  // Monthly equivalent for selected plan
  const monthlyEquivalentPrice = useMemo(() => {
    return Math.round(tableCount * selectedDuration.ratePerTablePerDay * 30);
  }, [tableCount, selectedDuration]);

  // Baseline standard price for the same total days (at ₹9/day)
  const standardEquivalentPrice = useMemo(() => {
    return Math.round(tableCount * 9 * selectedDuration.days);
  }, [tableCount, selectedDuration]);

  // Total savings
  const totalSavings = useMemo(() => {
    const savings = standardEquivalentPrice - calculatedPlanPrice;
    return savings > 0 ? savings : 0;
  }, [standardEquivalentPrice, calculatedPlanPrice]);

  // Effective setup charge (Waived 100% on 12 months, 50% discount on 6 months)
  const effectiveSetupFee = useMemo(() => {
    if (!includeHardwareStands) return 0;
    if (selectedDuration.id === "12m") return 0;
    if (selectedDuration.id === "6m") return Math.round(ONE_TIME_SETUP_FEE * 0.5);
    return ONE_TIME_SETUP_FEE;
  }, [includeHardwareStands, selectedDuration.id]);

  const grandTotal = calculatedPlanPrice + effectiveSetupFee;

  const handleTableChange = (val: number) => {
    const clamped = Math.max(1, Math.min(250, isNaN(val) ? 1 : val));
    setTableCount(clamped);
  };

  const handleProceedToTrial = () => {
    navigate(
      `/start-project?service=qr-menu&tables=${tableCount}&plan=${selectedDuration.id}&trial=7days`
    );
  };

  return (
    <div className="relative bg-[#F7F3EC] text-[#332A24] min-h-screen selection:bg-[#EADBCE] selection:text-[#332A24] overflow-x-hidden font-sans">
      <SEOHead
        title="Aveniq QR Menu Pricing — Transparent Daily Rates & Free Trial"
        description="Affordable digital café menus starting from just ₹9/table per day with discounts up to 33% on annual plans. Includes 7-day free trial and custom QR standee setup."
        canonical="https://theaveniq.site/qr-menu/pricing"
        keywords="Aveniq QR menu pricing, café digital menu cost, restaurant table QR pricing, QR code menu subscription, restaurant software India"
      />

      {/* Navbar Container */}
      <div className="relative z-50">
        <Navbar theme="light" />
      </div>

      {/* Hero / Header Section */}
      <section className="relative pt-36 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <BotanicalDecorations />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Breadcrumb / Back Link */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Link
              href="/qr-menu"
              className="text-xs font-mono uppercase tracking-[0.15em] text-[#766A5F] hover:text-[#9A6548] transition-colors flex items-center gap-1.5"
            >
              ← Back to Aveniq QR Menu
            </Link>
          </div>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBCF] bg-[#FFFDF8] shadow-xs mb-6 mx-auto">
            <Gift className="w-3.5 h-3.5 text-[#9A6548]" />
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#766A5F]">
              7-Day Free Trial Included
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-light leading-[1.08] tracking-tight text-[#332A24] mb-6 font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Simple, honest pricing. <br />
            <span className="italic text-[#9A6548] font-normal">
              Starting at just ₹9/table per day
            </span>
            .
          </h1>

          {/* Subtext */}
          <p className="text-[#766A5F] text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            No expensive POS lock-ins. No per-order commissions. Test your full menu live with your guests for 7 days with zero upfront risk.
          </p>

          {/* Key Value Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EFE7DA] flex items-center justify-center text-[#9A6548] shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#332A24] block">
                  ₹9 / Table / Day
                </span>
                <span className="text-xs text-[#766A5F] font-light">
                  Baseline rate. Drops down to ₹6 on longer commitments.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EFE7DA] flex items-center justify-center text-[#9A6548] shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#332A24] block">
                  One-Time Setup
                </span>
                <span className="text-xs text-[#766A5F] font-light">
                  Custom QR standee design, menu digitizing & staff onboarding.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#89947B]/20 flex items-center justify-center text-[#626e55] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#626e55] block">
                  7-Day Free Trial
                </span>
                <span className="text-xs text-[#766A5F] font-light">
                  Full feature access for all tables. No credit card required.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Simulator Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9A6548] block mb-2 font-medium">
              LIVE SIMULATOR
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#332A24] font-serif"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Simulate Your Café's Plan
            </h2>
            <p className="text-[#766A5F] text-sm sm:text-base font-light mt-2">
              Select your active tables and choose your subscription duration to see your instant calculated price and savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-sm">
              
              {/* 1. Table Count Input & Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#332A24] font-semibold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EFE7DA] text-[#9A6548] text-[11px] flex items-center justify-center font-mono">1</span>
                    Active Dining Tables:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={250}
                      value={tableCount}
                      onChange={(e) => handleTableChange(parseInt(e.target.value, 10))}
                      className="w-20 px-3 py-1.5 text-center text-base font-mono font-semibold rounded-xl bg-[#F7F3EC] border border-[#E4DBCF] text-[#332A24] focus:outline-none focus:border-[#9A6548] transition-colors"
                    />
                    <span className="text-xs text-[#766A5F] font-mono font-light">Tables</span>
                  </div>
                </div>

                {/* Slider */}
                <div className="pt-2 pb-1">
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={tableCount}
                    onChange={(e) => handleTableChange(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#EFE7DA] rounded-lg appearance-none cursor-pointer accent-[#9A6548]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#766A5F] mt-1">
                    <span>1 Table</span>
                    <span>25 Tables</span>
                    <span>50 Tables</span>
                    <span>100+ Tables</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-[#766A5F] font-mono mr-1">Quick Select:</span>
                  {PRESET_TABLES.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setTableCount(count)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                        tableCount === count
                          ? "bg-[#9A6548] text-[#FFFDF8] font-medium shadow-xs"
                          : "bg-[#F7F3EC] hover:bg-[#EFE7DA] text-[#766A5F] border border-[#E4DBCF]"
                      }`}
                    >
                      {count} Tables
                    </button>
                  ))}
                </div>

                {/* 1 Month Baseline Summary Card */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E4DBCF]/80 flex items-center justify-between">
                  <span className="text-xs font-light text-[#766A5F]">
                    Standard 1-Month Baseline ({tableCount} tables @ ₹9/day):
                  </span>
                  <span className="text-sm font-mono font-semibold text-[#332A24]">
                    ₹{oneMonthBaselinePrice.toLocaleString()} <span className="text-[10px] font-normal text-[#766A5F]">/ mo</span>
                  </span>
                </div>
              </div>

              {/* 2. Duration Selector */}
              <div className="space-y-4 pt-4 border-t border-[#E4DBCF]">
                <label className="text-xs font-mono uppercase tracking-wider text-[#332A24] font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EFE7DA] text-[#9A6548] text-[11px] flex items-center justify-center font-mono">2</span>
                  Select Subscription Duration:
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DURATION_OPTIONS.map((option) => {
                    const isSelected = selectedDurationId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedDurationId(option.id)}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#FFFDF8] border-[#9A6548] shadow-md shadow-[#9A6548]/10 ring-2 ring-[#9A6548]/20"
                            : "bg-[#F7F3EC] hover:bg-[#EFE7DA] border-[#E4DBCF]"
                        }`}
                      >
                        {option.badge && (
                          <span
                            className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-2 w-fit ${
                              option.isPopular
                                ? "bg-[#89947B]/20 text-[#626e55] font-semibold"
                                : isSelected
                                ? "bg-[#9A6548]/15 text-[#9A6548] font-medium"
                                : "bg-[#EFE7DA] text-[#766A5F]"
                            }`}
                          >
                            {option.badge}
                          </span>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-[#332A24]">{option.label}</div>
                          <div className="text-xs font-mono text-[#9A6548] font-medium mt-0.5">
                            ₹{option.ratePerTablePerDay}
                            <span className="text-[10px] font-light text-[#766A5F]">/tbl/day</span>
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            layoutId="active-check-pill"
                            className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#9A6548] text-white flex items-center justify-center text-[10px]"
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. One-Time Setup & Hardware Standees Toggle */}
              <div className="pt-4 border-t border-[#E4DBCF]">
                <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F7F3EC] border border-[#E4DBCF]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-[#332A24] uppercase tracking-wider">
                        One-Time Onboarding & Standee Pack
                      </span>
                      {selectedDuration.id === "12m" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#89947B]/20 text-[#626e55] text-[10px] font-mono font-semibold">
                          100% FREE
                        </span>
                      )}
                      {selectedDuration.id === "6m" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#9A6548]/15 text-[#9A6548] text-[10px] font-mono font-semibold">
                          50% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#766A5F] font-light leading-relaxed">
                      Custom engraved/printed QR tabletop cards, full menu catalog ingestion, HD image optimization, and staff training.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {effectiveSetupFee === 0 ? (
                      <div>
                        <span className="text-xs line-through text-[#766A5F] block font-mono">₹{ONE_TIME_SETUP_FEE}</span>
                        <span className="text-sm font-mono font-semibold text-[#626e55]">₹0</span>
                      </div>
                    ) : (
                      <span className="text-sm font-mono font-semibold text-[#332A24]">
                        ₹{effectiveSetupFee.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Calculated Amount Card */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#EFE7DA] border border-[#E4DBCF] shadow-lg shadow-[#332A24]/5 space-y-6">
                
                {/* Header with Free Trial Banner */}
                <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#89947B]/20 flex items-center justify-center text-[#626e55]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#626e55] block">
                        Complimentary
                      </span>
                      <span className="text-xs font-semibold text-[#332A24]">
                        7-Day Free Live Trial
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#626e55]">₹0 Today</span>
                </div>

                {/* Price Display */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#766A5F]">
                      Simulated Amount ({selectedDuration.label})
                    </span>
                    <span className="text-xs font-mono text-[#9A6548] font-medium">
                      ₹{selectedDuration.ratePerTablePerDay}/table/day
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={grandTotal}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl sm:text-5xl font-light text-[#332A24] font-serif"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        ₹{grandTotal.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-xs text-[#766A5F] font-mono">
                      total for {tableCount} tables ({selectedDuration.days} days)
                    </span>
                  </div>

                  <div className="text-xs text-[#766A5F] font-mono">
                    Effective monthly: <span className="font-semibold text-[#332A24]">₹{monthlyEquivalentPrice.toLocaleString()} / month</span>
                  </div>
                </div>

                {/* Savings Callout */}
                {totalSavings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#89947B]/40 flex items-center justify-between text-xs"
                  >
                    <span className="text-[#626e55] font-medium flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4 text-[#626e55]" />
                      Duration Plan Savings:
                    </span>
                    <span className="font-mono font-bold text-[#626e55]">
                      - ₹{totalSavings.toLocaleString()} saved
                    </span>
                  </motion.div>
                )}

                {/* Breakdown List */}
                <div className="space-y-2.5 pt-2 border-t border-[#E4DBCF] text-xs font-light text-[#766A5F]">
                  <div className="flex justify-between">
                    <span>{tableCount} Tables × {selectedDuration.days} Days @ ₹{selectedDuration.ratePerTablePerDay}</span>
                    <span className="font-mono text-[#332A24]">₹{calculatedPlanPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom Standees & Digital Setup Fee</span>
                    <span className="font-mono text-[#332A24]">
                      {effectiveSetupFee === 0 ? "FREE" : `₹${effectiveSetupFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#626e55] font-medium">
                    <span>7 Days Risk-Free Trial Period</span>
                    <span className="font-mono">Included (0 Cost)</span>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleProceedToTrial}
                    className="w-full py-4 rounded-full bg-[#9A6548] hover:bg-[#855439] text-[#FFFDF8] font-medium text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/20 flex items-center justify-center gap-2 group"
                  >
                    Start 7-Day Free Trial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-center text-[#766A5F] font-mono">
                    Instant setup. No credit card required. Cancel anytime.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparent Rate Comparison Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#EFE7DA]/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9A6548] block mb-2 font-medium">
              TIER OVERVIEW
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#332A24] font-serif"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              All Durations Include Every Feature
            </h2>
            <p className="text-[#766A5F] text-sm sm:text-base font-light mt-2">
              No locked features. Whether you pay month-to-month or annually, your guests get the fastest, most beautiful menu experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DURATION_OPTIONS.map((plan) => {
              const samplePriceFor10 = Math.round(10 * plan.ratePerTablePerDay * plan.days);
              const isSelected = selectedDurationId === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl bg-[#FFFDF8] border transition-all duration-200 flex flex-col justify-between ${
                    plan.isPopular
                      ? "border-[#9A6548] shadow-md ring-1 ring-[#9A6548]/30"
                      : "border-[#E4DBCF] shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#766A5F]">
                        {plan.label}
                      </span>
                      {plan.badge && (
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EFE7DA] text-[#9A6548] font-medium">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-3xl sm:text-4xl font-light text-[#332A24] font-serif"
                          style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
                          ₹{plan.ratePerTablePerDay}
                        </span>
                        <span className="text-xs font-mono text-[#766A5F]">/ table / day</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#766A5F] block mt-1">
                        ₹{samplePriceFor10.toLocaleString()} for 10 tables ({plan.days}d)
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#332A24] font-light border-t border-[#E4DBCF] pt-4">
                      {[
                        "Instant <100ms mobile QR loading",
                        "Unlimited menu edits & photos",
                        "Custom branded table standees",
                        "Live item availability toggle",
                        "Dedicated WhatsApp support",
                        "7-Day Free Trial included",
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#9A6548] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDurationId(plan.id);
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className={`mt-6 w-full py-2.5 rounded-full text-xs font-medium font-mono transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#9A6548] text-[#FFFDF8]"
                        : "bg-[#F7F3EC] hover:bg-[#EFE7DA] text-[#332A24] border border-[#E4DBCF]"
                    }`}
                  >
                    {isSelected ? "Currently Selected" : `Select ${plan.label}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-light text-[#332A24] font-serif mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs font-mono text-[#766A5F] uppercase tracking-wider">
              Clear answers before you start
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the 7-day free trial work?",
                a: "When you sign up, our team configures your custom digital menu and generates your table QR codes within 24 hours. You can test it live in your café with real customers for 7 days. If you love it, select your plan to continue. No credit card required to start.",
              },
              {
                q: "What is included in the one-time setup charge?",
                a: "Our team takes care of digitizing your menu items, uploading high-resolution food/beverage photography, designing matching branded tabletop standees, and configuring table routing. On annual (12-month) plans, this setup is completely waived.",
              },
              {
                q: "Can I add or remove tables as my café expands or changes layout?",
                a: "Yes! You can adjust your active table count at any time from your café admin dashboard. Billing adjusts pro-rata automatically.",
              },
              {
                q: "Do you take any percentage or commission on orders?",
                a: "Never. Aveniq QR Menu charges a flat daily subscription per table. We never take transaction percentages or commission on your café's sales.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs space-y-2"
              >
                <h3 className="text-sm sm:text-base font-semibold text-[#332A24] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A6548]" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#766A5F] font-light leading-relaxed pl-3.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-[#E4DBCF] bg-[#EFE7DA] text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl font-light text-[#332A24] font-serif mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ready to upgrade your tables?
          </h2>
          <p className="text-[#766A5F] text-base font-light mb-8">
            Experience why boutique cafés and roasteries love Aveniq QR Menu. Setup takes less than 24 hours.
          </p>

          <button
            onClick={handleProceedToTrial}
            className="px-9 py-4 rounded-full bg-[#9A6548] hover:bg-[#855439] text-[#FFFDF8] font-medium text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/15 inline-flex items-center gap-2"
          >
            Claim 7-Day Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
