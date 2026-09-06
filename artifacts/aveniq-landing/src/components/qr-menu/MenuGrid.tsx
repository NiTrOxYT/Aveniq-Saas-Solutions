import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MenuItem } from "@/data/qrMenuData";
import { MenuItemCard } from "./MenuItemCard";
import { MenuEmptyState } from "./MenuEmptyState";

interface MenuGridProps {
  items: MenuItem[];
  activeCategory: string;
  cart: Record<string, number>;
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
}

export function MenuGrid({
  items,
  activeCategory,
  cart,
  onAddToCart,
  onRemoveFromCart,
}: MenuGridProps) {
  const reduce = useReducedMotion();

  if (!items || items.length === 0) {
    return <MenuEmptyState category={activeCategory} />;
  }

  return (
    <div
      role="tabpanel"
      id={`category-panel-${activeCategory}`}
      aria-labelledby={`category-tab-${activeCategory}`}
      className="relative"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategory}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-2.5"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: reduce ? 0 : Math.min(index * 0.04, 0.16),
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <MenuItemCard
                item={item}
                quantity={cart[item.id] || 0}
                onAdd={() => onAddToCart(item.id)}
                onRemove={() => onRemoveFromCart(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
