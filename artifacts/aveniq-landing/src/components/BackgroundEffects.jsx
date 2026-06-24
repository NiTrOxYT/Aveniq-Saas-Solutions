import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
export default function BackgroundEffects() {
    const containerRef = useRef(null);
    const spotlightRef = useRef(null);
    const [lowPower, setLowPower] = useState(false);
    useEffect(() => {
        let isLowPower = false;
        if (typeof window !== "undefined") {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const cores = navigator.hardwareConcurrency || 8;
            const memory = navigator.deviceMemory || 8;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            isLowPower = prefersReduced || cores <= 4 || memory <= 4 || isMobile;
            if (isLowPower) {
                setLowPower(true);
                document.body.classList.add("low-power");
            }
            else {
                document.body.classList.remove("low-power");
            }
        }
        if (isLowPower)
            return;
        let anims = [];
        let idleId = null;
        let timeoutId = null;
        let active = true;
        const handleMouseMove = (e) => {
            if (document.hidden)
                return;
            gsap.to(spotlightRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        };
        const initAnimations = () => {
            if (!active)
                return;
            // Orbs animation
            const orbs = document.querySelectorAll(".bg-orb");
            orbs.forEach((orb) => {
                const tween = gsap.to(orb, {
                    y: "random(-50, 50)",
                    x: "random(-50, 50)",
                    duration: "random(4, 8)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                anims.push(tween);
            });
            window.addEventListener("mousemove", handleMouseMove);
        };
        if (typeof window !== "undefined") {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(() => initAnimations());
            }
            else {
                timeoutId = setTimeout(initAnimations, 500);
            }
        }
        const handleVisibilityChange = () => {
            if (document.hidden) {
                anims.forEach((t) => t.pause());
            }
            else {
                anims.forEach((t) => t.play());
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            active = false;
            if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId)
                clearTimeout(timeoutId);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            anims.forEach((t) => t.kill());
        };
    }, []);
    return (<div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      
      {/* Spotlight */}
      {!lowPower && (<div ref={spotlightRef} className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#6750A4]/10 to-[#9C89D9]/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>)}

      {/* Floating Orbs */}
      {!lowPower && (<>
          <div className="bg-orb absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#6750A4]/20 rounded-full blur-[120px]"/>
          <div className="bg-orb absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-[#9C89D9]/10 rounded-full blur-[150px]"/>
          <div className="bg-orb absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-[#6750A4]/15 rounded-full blur-[150px]"/>
          <div className="bg-orb absolute top-[-10%] right-[30%] w-[250px] h-[250px] bg-[#9C89D9]/20 rounded-full blur-[100px]"/>
        </>)}
    </div>);
}
