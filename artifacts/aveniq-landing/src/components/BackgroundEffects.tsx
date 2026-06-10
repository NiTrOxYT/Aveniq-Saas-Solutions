import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        ref={spotlightRef}
        className="absolute rounded-full"
        style={{
          top: 0,
          left: 0,
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(103,80,164,0.055) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
