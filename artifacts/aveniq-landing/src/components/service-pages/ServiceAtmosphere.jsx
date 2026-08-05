import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
export function ServiceAtmosphere() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 45, stiffness: 120, mass: 0.8 };
    const dMouseX = useSpring(mouseX, springConfig);
    const dMouseY = useSpring(mouseY, springConfig);
    const reduce = useReducedMotion();
    const [isLowPower, setIsLowPower] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const cores = navigator.hardwareConcurrency || 8;
            const memory = navigator.deviceMemory || 8;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsLowPower(prefersReduced || cores <= 4 || memory <= 4 || isMobile);
        }
    }, []);
    useEffect(() => {
        if (reduce || isLowPower)
            return;
        const handleMouseMove = (e) => {
            // Gentle displacement of max 12px to prevent visual distraction
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 12;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 12;
            mouseX.set(xOffset);
            mouseY.set(yOffset);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [reduce, isLowPower, mouseX, mouseY]);
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Layer 1: Cinematic Deep Gradients */}
      <div className="absolute inset-0 bg-black" style={{
            background: "radial-gradient(circle at 50% 0%, #07101D 0%, #04050A 35%, #020203 100%)",
        }}/>
      <div className="absolute inset-0 opacity-40" style={{
            background: "linear-gradient(180deg, transparent 0%, #05060A 50%, #010102 100%)",
        }}/>

      {/* Layer 2: Moving Mesh Gradients (Disabled on mobile/low-power to optimize scroll performance) */}
      {!reduce && !isLowPower && (<>
          <motion.div animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 90, 0],
            }} transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-25%] left-[-20%] w-[90vw] h-[90vw] rounded-full blur-[200px]" style={{
                background: "radial-gradient(circle at center, rgba(59,130,246,0.04) 0%, transparent 60%)",
            }}/>
          <motion.div animate={{
                scale: [1.1, 0.95, 1.1],
                rotate: [90, 180, 90],
            }} transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-15%] right-[-15%] w-[100vw] h-[100vw] rounded-full blur-[220px]" style={{
                background: "radial-gradient(circle at center, rgba(139,92,246,0.03) 0%, transparent 60%)",
            }}/>
        </>)}

      {/* Layer 3: Section Glows (Disabled on mobile/low-power to eliminate CSS filter repaints) */}
      {!isLowPower && (<div className="absolute inset-0 w-full h-full">
          {/* Hero Area Glow (Blue) */}
          <motion.div className="absolute top-[8%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-blue-500/5 blur-[250px]" style={{ x: dMouseX, y: dMouseY }}/>

          {/* Overview Area Glow (Indigo) */}
          <motion.div className="absolute top-[25%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] rounded-full bg-indigo-500/4 blur-[280px]" style={{ x: dMouseX, y: dMouseY }}/>

          {/* Features Area Glow (Cyan) */}
          <motion.div className="absolute top-[48%] right-[10%] w-[55vw] h-[55vw] max-w-[750px] rounded-full bg-cyan-500/4 blur-[300px]" style={{ x: dMouseX, y: dMouseY }}/>

          {/* Tech Stack Glow (Purple) */}
          <motion.div className="absolute top-[68%] left-[25%] w-[45vw] h-[45vw] max-w-[650px] rounded-full bg-purple-500/4 blur-[260px]" style={{ x: dMouseX, y: dMouseY }}/>

          {/* CTA Area Glow (Violet) */}
          <motion.div className="absolute bottom-[4%] left-[50%] -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] rounded-full bg-violet-600/6 blur-[320px]" style={{ x: dMouseX, y: dMouseY }}/>
        </div>)}

      {/* Layer 5: Fine Apple-style noise grain (Overlaid at 2% opacity) */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}/>

      {/* Layer 6: Engineering Grid System (2.5% opacity, disappears on mobile) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none hidden md:block" style={{
            maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 85%)",
        }}/>
    </div>);
}
