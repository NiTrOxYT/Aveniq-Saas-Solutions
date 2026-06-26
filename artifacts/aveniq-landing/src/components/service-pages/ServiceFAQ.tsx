import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { ServiceConfig } from "@/data/serviceData";

interface ServiceFAQProps {
  service: ServiceConfig;
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  const { faqs, schemaService } = service;
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-28 px-4 sm:px-6 relative z-10 border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(103,80,164,0.04) 0%, transparent 70%)",
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
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Common questions about{" "}
            <span className="italic text-white/60">{schemaService.name}</span>
          </h2>
          <p className="text-white/40 text-base font-light leading-relaxed">
            Honest answers to the questions we hear most often.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="space-y-px">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.4,
                delay: Math.min(i * 0.04, 0.3),
                ease: [0.23, 1, 0.32, 1],
              }}
              className="border-b border-white/[0.06] last:border-b-0"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
                aria-expanded={openIndex === i}
                id={`faq-btn-${i}`}
                aria-controls={`faq-panel-${i}`}
              >
                <span
                  className="text-white/80 text-base font-medium leading-snug group-hover:text-white transition-colors duration-200"
                  style={{ maxWidth: "75ch" }}
                >
                  {faq.question}
                </span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center mt-0.5 text-white/40 group-hover:text-white group-hover:border-white/[0.2] transition-all duration-200"
                >
                  {openIndex === i ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    key={`panel-${i}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="pb-6 text-white/50 text-sm leading-relaxed font-light"
                      style={{ maxWidth: "75ch" }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
