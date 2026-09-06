import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/data/qrMenuData";
import { MenuItemImage } from "./MenuItemImage";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuItemCard({ item, quantity, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] shadow-xs hover:border-[#9A6548]/30 transition-all duration-200 flex items-center justify-between gap-3 group">
      
      {/* Left: Image & Text Details */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* 48px square image on mobile, 52px on desktop */}
        <MenuItemImage
          src={item.image}
          alt={item.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-xs"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-[13px] font-medium text-[#332A24] truncate">
              {item.name}
            </h4>
            {item.isPopular && (
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[8px] font-mono uppercase bg-[#C98F6B]/15 text-[#9A6548] rounded">
                Top Pick
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#766A5F] font-light truncate mt-0.5">
            {item.description}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#EFE7DA] text-[#766A5F]/90">
                {item.tags[0]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Price & Interactive Stepper */}
      <div className="flex items-center gap-2.5 shrink-0 pl-1">
        <span className="text-xs sm:text-sm font-mono font-medium text-[#332A24]">
          ₹{item.price}
        </span>

        {quantity === 0 ? (
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            aria-label={`Add ${item.name}`}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#EFE7DA] text-[#9A6548] hover:bg-[#9A6548] hover:text-[#FFFDF8] flex items-center justify-center text-xs font-semibold transition-colors duration-150 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-[#EFE7DA] border border-[#E4DBCF]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              aria-label={`Decrease ${item.name}`}
              className="w-5 h-5 rounded-full bg-[#FFFDF8] text-[#766A5F] hover:text-[#332A24] flex items-center justify-center text-xs cursor-pointer shadow-2xs"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-[#332A24] w-3.5 text-center">
              {quantity}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              aria-label={`Increase ${item.name}`}
              className="w-5 h-5 rounded-full bg-[#9A6548] text-[#FFFDF8] hover:bg-[#855439] flex items-center justify-center text-xs cursor-pointer shadow-2xs"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
