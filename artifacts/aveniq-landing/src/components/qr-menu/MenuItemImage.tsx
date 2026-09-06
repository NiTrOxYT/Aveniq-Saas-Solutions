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
      className={`relative overflow-hidden rounded-xl bg-[#EFE7DA] border border-[#E4DBCF]/80 flex items-center justify-center shrink-0 ${className}`}
    >
      {/* Background warm café fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#EFE7DA] text-[#9A6548]/40">
        <Coffee className="w-5 h-5 opacity-60" />
      </div>

      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 relative z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
