import { Coffee } from "lucide-react";

interface MenuEmptyStateProps {
  category: string;
}

export function MenuEmptyState({ category }: MenuEmptyStateProps) {
  return (
    <div className="py-10 px-4 text-center rounded-2xl bg-[#FFFDF8] border border-[#E4DBCF] flex flex-col items-center justify-center space-y-2">
      <div className="w-10 h-10 rounded-full bg-[#EFE7DA] text-[#9A6548] flex items-center justify-center mb-1">
        <Coffee className="w-5 h-5 opacity-70" />
      </div>
      <h4 className="text-xs font-medium text-[#332A24]">Nothing here yet</h4>
      <p className="text-[11px] text-[#766A5F] font-light max-w-[200px] leading-relaxed">
        This café hasn't added any items to {category} yet.
      </p>
    </div>
  );
}
