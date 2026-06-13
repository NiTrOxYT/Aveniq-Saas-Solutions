import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Products Shipped" },
  { value: 99.9, suffix: "%", label: "Uptime SLA", isFloat: true },
  { value: 3, suffix: "×", label: "Avg. Performance" },
];

function CountUpNumber({ value, suffix, isFloat }: { value: number; suffix: string; isFloat?: boolean }) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCurrent(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 1500; // ms
          const startTime = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentVal = easeProgress * (end - start) + start;
            setCurrent(isFloat ? Number(currentVal.toFixed(1)) : Math.floor(currentVal));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, reduce, hasAnimated, isFloat]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-12 md:py-16 border-y border-white/5 bg-black/40 backdrop-blur-md z-10 overflow-hidden">
      {/* Light glow behind stats */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-8 bg-[#6750A4]/5 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center text-center gap-2"
            >
              <span
                className="text-4xl md:text-5xl font-bold font-serif"
                style={{
                  background: "linear-gradient(135deg, #ffffff 30%, #C4B5FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUpNumber value={s.value} suffix={s.suffix} isFloat={s.isFloat} />
              </span>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/40">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
