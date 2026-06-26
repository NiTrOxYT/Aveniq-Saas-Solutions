import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Aveniq turned our ambiguous product spec into a live SaaS platform in 11 weeks. The code quality passed our Series A technical due diligence without a single major finding. That alone justified the investment.",
    name: "Rohan Mehta",
    role: "Co-founder & CEO",
    company: "Klyra (B2B Analytics)",
    initials: "RM",
    color: "#6750A4",
    rating: 5,
  },
  {
    quote:
      "We had tried two other agencies before Aveniq. The difference was architectural thinking from day one. They asked questions the others didn't — and those questions saved us from rebuilding six months later.",
    name: "Priya Nair",
    role: "VP of Product",
    company: "FieldSync (Field Service SaaS)",
    initials: "PN",
    color: "#9C89D9",
    rating: 5,
  },
  {
    quote:
      "The AI automation pipeline Aveniq built processes 800 documents per day with 99.2% accuracy. We estimated this would require 3 full-time staff to do manually. The ROI was visible within 60 days of going live.",
    name: "Arjun Shetty",
    role: "Head of Operations",
    company: "DocuBridge (Legal Tech)",
    initials: "AS",
    color: "#7C6BC4",
    rating: 5,
  },
  {
    quote:
      "From concept to App Store approval in 9 weeks. 4.7 star rating on first launch. They understood that mobile UX is 90% of the battle and built accordingly — not just a website squeezed onto a phone screen.",
    name: "Tanvi Shah",
    role: "Founder",
    company: "WellPath (Health & Fitness App)",
    initials: "TS",
    color: "#8B7DD4",
    rating: 5,
  },
] as const;

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(103,80,164,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Client perspectives
          </h2>
          <p className="text-white/40 text-base font-light">
            What the people who hired us say about working with us.
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div
          className="relative rounded-2xl border border-white/[0.06] bg-[#09090b] p-10 md:p-14 overflow-hidden"
          role="region"
          aria-live="polite"
          aria-label="Testimonial carousel"
        >
          {/* Background monogram */}
          <div
            className="absolute -right-8 -bottom-8 text-[12rem] font-serif font-bold opacity-[0.02] select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            {t.initials}
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-8">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#9C89D9] text-[#9C89D9]" />
            ))}
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? {} : { opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-[70ch]"
              style={{
                fontFamily: "'Instrument Serif', serif",
                letterSpacing: "-0.01em",
              }}
            >
              &#8220;{t.quote}&#8221;
            </motion.blockquote>
          </AnimatePresence>

          {/* Attribution */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`attr-${current}`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? {} : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: `${t.color}30`, border: `1px solid ${t.color}50` }}
              >
                {t.initials}
              </div>

              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs font-light">
                  {t.role} — {t.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.2] transition-all duration-200 active:scale-[0.95]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-300"
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "20px" : "6px",
                      height: "6px",
                      background: i === current ? "#9C89D9" : "rgba(255,255,255,0.15)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/[0.2] transition-all duration-200 active:scale-[0.95]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
