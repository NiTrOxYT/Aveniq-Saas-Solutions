import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { QR_MENU_DATA } from "@/data/qrMenuData";
import { MenuCategoryTabs } from "./MenuCategoryTabs";
import { MenuGrid } from "./MenuGrid";

interface PhoneMenuMockupProps {
  layoutIdPrefix?: string;
  className?: string;
}

export function PhoneMenuMockup({
  layoutIdPrefix = "phone-mockup",
  className = "",
}: PhoneMenuMockupProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Coffee");
  const [cart, setCart] = useState<Record<string, number>>({
    cappuccino: 1,
  });

  const categories = Object.keys(QR_MENU_DATA);
  const currentItems = QR_MENU_DATA[activeCategory] || [];

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const count = prev[id] || 0;
      if (count <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: count - 1 };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    for (const cat of Object.values(QR_MENU_DATA)) {
      const match = cat.find((item) => item.id === id);
      if (match) return sum + match.price * qty;
    }
    return sum;
  }, 0);

  return (
    <div className={`rounded-[32px] p-3 bg-[#FFFDF8] border border-[#E4DBCF] shadow-xl shadow-[#332A24]/10 ${className}`}>
      <div className="rounded-[24px] bg-[#F7F3EC] p-4 sm:p-5 border border-[#E4DBCF]/80 select-none">
        
        {/* Café Branding Header */}
        <div className="flex items-center justify-between border-b border-[#E4DBCF] pb-3 mb-3">
          <div>
            <h3
              className="text-[#332A24] font-serif text-xl font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              morning & co.
            </h3>
            <p className="text-[10px] text-[#766A5F] font-light">Good morning • Artisanal Specialty Roasters</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#89947B]/15 border border-[#89947B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89947B] animate-pulse" />
            <span className="text-[9px] font-mono font-medium text-[#556347]">
              Table 04
            </span>
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <MenuCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          layoutIdPrefix={layoutIdPrefix}
        />

        {/* Menu Items Grid */}
        <div className="min-h-[260px]">
          <MenuGrid
            items={currentItems}
            activeCategory={activeCategory}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </div>

        {/* Live Order Bar */}
        <div className="mt-3 pt-2 border-t border-[#E4DBCF]">
          {totalItems > 0 ? (
            <div className="w-full py-2.5 px-3.5 rounded-xl bg-[#9A6548] text-[#FFFDF8] flex items-center justify-between text-xs font-medium shadow-sm transition-all">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FFFDF8]/20 flex items-center justify-center text-[10px] font-mono">
                  {totalItems}
                </span>
                <span className="text-[11px]">Your Order</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold">
                <span>₹{totalPrice}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[9px] font-mono text-[#766A5F] py-1">
              <span>Touchless QR Ordering</span>
              <span className="text-[#89947B]">Live Sync Active</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
