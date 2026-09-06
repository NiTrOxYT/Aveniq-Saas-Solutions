import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MenuCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  layoutIdPrefix?: string;
}

export function MenuCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
  layoutIdPrefix = "qr-menu-tabs",
}: MenuCategoryTabsProps) {
  const reduce = useReducedMotion();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view on mobile / narrow viewports
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  return (
    <div
      ref={tabsContainerRef}
      role="tablist"
      aria-label="Menu categories"
      className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-2 -mx-1 px-1"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            ref={isActive ? activeTabRef : null}
            role="tab"
            aria-selected={isActive}
            aria-controls={`category-panel-${cat}`}
            id={`category-tab-${cat}`}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`relative px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#9A6548] active:scale-[0.97] ${
              isActive ? "text-[#FFFDF8]" : "text-[#766A5F] hover:text-[#332A24]"
            }`}
          >
            {/* Shared sliding active background pill */}
            {isActive && (
              <motion.div
                layoutId={`${layoutIdPrefix}-active-pill`}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 32 }
                }
                className="absolute inset-0 rounded-full bg-[#9A6548] shadow-xs"
              />
            )}

            {/* Inactive background border pill */}
            {!isActive && (
              <div className="absolute inset-0 rounded-full bg-[#FFFDF8] border border-[#E4DBCF]" />
            )}

            {/* Text Label */}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
