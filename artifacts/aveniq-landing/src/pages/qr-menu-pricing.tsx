import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  Coffee, 
  Sparkles, 
  Gift,
  TrendingDown
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
    badge: "₹8 / day",
  },
  {
    id: "6m",
    label: "6 Months",
    months: 6,
    days: 180,
    ratePerTablePerDay: 7.5,
    badge: "₹7.5 / day",
    isPopular: true,
  },
  {
    id: "12m",
    label: "12 Months",
    months: 12,
    days: 365,
    ratePerTablePerDay: 6,
    badge: "₹6 / day • Best Value",
  },
];

const PRESET_TABLES = [5, 10, 15, 20, 30, 50];

export default function QRMenuPricingPage() {
  const [, navigate] = useLocation();
  const [tableCount, setTableCount] = useState<number>(10);
  const [selectedDurationId, setSelectedDurationId] = useState<"1m" | "3m" | "6m" | "12m">("6m");

  const selectedDuration = useMemo(
    () => DURATION_OPTIONS.find((opt) => opt.id === selectedDurationId) || DURATION_OPTIONS[2],
    [selectedDurationId]
  );

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return Math.round(tableCount * selectedDuration.ratePerTablePerDay * selectedDuration.days);
  }, [tableCount, selectedDuration]);

  // Service fee (18%)
  const serviceFee = useMemo(() => {
    return Math.round(subtotal * 0.18);
  }, [subtotal]);

  // Grand total including 18% service fee
  const grandTotal = subtotal + serviceFee;

  // Monthly equivalent
  const monthlyEquivalent = useMemo(() => {
    const monthlySub = Math.round(tableCount * selectedDuration.ratePerTablePerDay * 30);
    const monthlyFee = Math.round(monthlySub * 0.18);
    return monthlySub + monthlyFee;
  }, [tableCount, selectedDuration]);

  // 1-month baseline for display (at ₹9/day + 18% service fee)
  const oneMonthBaseline = useMemo(() => {
    const base = Math.round(tableCount * 9 * 30);
    const fee = Math.round(base * 0.18);
    return base + fee;
  }, [tableCount]);

  // Total savings vs standard ₹9/day rate
  const totalSavings = useMemo(() => {
    const standardBase = Math.round(tableCount * 9 * selectedDuration.days);
    const standardTotal = standardBase + Math.round(standardBase * 0.18);
    const savings = standardTotal - grandTotal;
    return savings > 0 ? savings : 0;
  }, [tableCount, selectedDuration, grandTotal]);

  const handleTableChange = (val: number) => {
    const clamped = Math.max(1, Math.min(200, isNaN(val) ? 1 : val));
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
        title="Aveniq QR Menu Pricing — Simple & Transparent Rates"
        description="Affordable digital café menus starting from just ₹9/table per day with discounts up to 33% on annual plans. Includes 7-day free trial."
        canonical="https://theaveniq.site/qr-menu/pricing"
        keywords="Aveniq QR menu pricing, café digital menu cost, restaurant table QR pricing, QR code menu subscription"
      />

      {/* Navbar Container */}
      <div className="relative z-50">
        <Navbar theme="light" />
      </div>

      {/* Header Section */}
      <section className="relative pt-36 sm:pt-44 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden">
        <BotanicalDecorations />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Back link */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Link
              href="/qr-menu"
              className="text-xs font-mono uppercase tracking-[0.15em] text-[#766A5F] hover:text-[#9A6548] transition-colors"
            >
              ← Back to Aveniq QR Menu
            </Link>
          </div>

          {/* Trial Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E4DBCF] bg-[#FFFDF8] shadow-xs mb-6 mx-auto">
            <Gift className="w-3.5 h-3.5 text-[#9A6548]" />
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#766A5F]">
              7-Day Free Trial Included
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.1] tracking-tight text-[#332A24] mb-4 font-serif"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Simple, Transparent Pricing
          </h1>

          <p className="text-[#766A5F] text-base sm:text-lg font-light max-w-xl mx-auto">
            Starting at <strong className="font-semibold text-[#332A24]">₹9/table per day</strong>. No setup fees, no lock-ins, and 7 days free to test live in your café.
          </p>
        </div>
      </section>

      {/* Main Interactive Calculator Card */}
      <section className="py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FFFDF8] border border-[#E4DBCF] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Step 1: Table Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-[#766A5F] font-medium">
                  1. How many tables does your café have?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={tableCount}
                    onChange={(e) => handleTableChange(parseInt(e.target.value, 10))}
                    className="w-20 px-3 py-1.5 text-center text-base font-mono font-semibold rounded-xl bg-[#F7F3EC] border border-[#E4DBCF] text-[#332A24] focus:outline-none focus:border-[#9A6548] transition-colors"
                  />
                  <span className="text-xs text-[#766A5F] font-mono">Tables</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={1}
                max={60}
                value={tableCount}
                onChange={(e) => handleTableChange(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#EFE7DA] rounded-lg appearance-none cursor-pointer accent-[#9A6548]"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-[#766A5F] font-mono">Presets:</span>
                {PRESET_TABLES.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTableCount(count)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      tableCount === count
                        ? "bg-[#9A6548] text-[#FFFDF8] font-medium shadow-xs"
                        : "bg-[#F7F3EC] hover:bg-[#EFE7DA] text-[#766A5F] border border-[#E4DBCF]"
                    }`}
                  >
                    {count} Tables
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Duration */}
            <div className="space-y-3 pt-6 border-t border-[#E4DBCF]">
              <label className="text-xs font-mono uppercase tracking-wider text-[#766A5F] font-medium block">
                2. Choose duration:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DURATION_OPTIONS.map((option) => {
                  const isSelected = selectedDurationId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedDurationId(option.id)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#FFFDF8] border-[#9A6548] shadow-sm ring-2 ring-[#9A6548]/20"
                          : "bg-[#F7F3EC] hover:bg-[#EFE7DA] border-[#E4DBCF]"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#332A24]">{option.label}</div>
                        <div className="text-xs font-mono text-[#9A6548] font-medium mt-0.5">
                          ₹{option.ratePerTablePerDay}
                          <span className="text-[10px] text-[#766A5F] font-light">/tbl/day</span>
                        </div>
                      </div>

                      {option.badge && (
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-3 w-fit ${
                            isSelected
                              ? "bg-[#9A6548]/15 text-[#9A6548] font-medium"
                              : "bg-[#EFE7DA] text-[#766A5F]"
                          }`}
                        >
                          {option.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Calculation Breakdown Receipt */}
            <div className="pt-6 border-t border-[#E4DBCF]">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F3EC] border border-[#E4DBCF] space-y-4">
                
                {/* Free trial tag */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E4DBCF]/80">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#9A6548]" />
                    <span className="text-xs font-semibold text-[#332A24]">
                      7-Day Free Trial
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#626e55]">
                    ₹0 Today (Full Access)
                  </span>
                </div>

                {/* Breakdown items */}
                <div className="space-y-2 text-xs font-light text-[#766A5F]">
                  <div className="flex justify-between">
                    <span>
                      {tableCount} Tables × {selectedDuration.days} Days (@ ₹{selectedDuration.ratePerTablePerDay}/day)
                    </span>
                    <span className="font-mono text-[#332A24]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee (18%)</span>
                    <span className="font-mono text-[#332A24]">₹{serviceFee.toLocaleString()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#626e55] font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        Duration Discount Savings
                      </span>
                      <span className="font-mono">- ₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-[#E4DBCF] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#766A5F] block">
                      Total Plan Amount
                    </span>
                    <span className="text-[11px] text-[#766A5F] font-mono">
                      ~ ₹{monthlyEquivalent.toLocaleString()} / month
                    </span>
                  </div>
                  <div className="text-right">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={grandTotal}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="text-3xl sm:text-4xl font-light text-[#332A24] font-serif"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        ₹{grandTotal.toLocaleString()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-2">
                  <button
                    onClick={handleProceedToTrial}
                    className="w-full py-4 rounded-full bg-[#9A6548] hover:bg-[#855439] text-[#FFFDF8] font-medium text-sm transition-all duration-200 cursor-pointer shadow-md shadow-[#9A6548]/15 flex items-center justify-center gap-2 group"
                  >
                    Start 7-Day Free Trial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-center text-[#766A5F] font-mono mt-2.5">
                    No payment needed today. Test live with your guests for 7 days.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Feature List */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DBCF] space-y-4">
            <h3
              className="text-xl sm:text-2xl font-serif text-[#332A24]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Every plan includes everything:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#332A24] font-light">
              {[
                "Instant <100ms QR scan & menu loading",
                "Unlimited menu items, categories & photos",
                "Update prices and 86 sold-out items instantly",
                "Custom branded QR table codes",
                "Dedicated customer support",
                "7-Day Free Trial to test with your guests",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#9A6548] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
