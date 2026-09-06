import { useState } from "react";
import { Coffee } from "lucide-react";

interface MenuItemImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MenuItemImage({ src, alt, className = "" }: MenuItemImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#EFE7DA] border border-[#E4DBCF]/80 flex items-center justify-center shrink-0 select-none ${className}`}
    >
      {/* Background warm placeholder & subtle coffee icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-[#EFE7DA] text-[#9A6548]/40 transition-opacity duration-300 ${
          isLoaded && !hasError ? "opacity-0" : "opacity-100"
        }`}
      >
        <Coffee className="w-5 h-5 opacity-50" />
      </div>

      {/* Shimmer overlay while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      )}

      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-300 relative z-10 group-hover:scale-[1.03] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
