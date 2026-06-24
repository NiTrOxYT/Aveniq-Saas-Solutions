import { useEffect, useRef, useState } from "react";
const VIDEO_URL = "/videos-webm/hero-bg.webm";
export default function BackgroundVideo() {
    const videoRef = useRef(null);
    const [videoActive, setVideoActive] = useState(false);
    useEffect(() => {
        const video = videoRef.current;
        if (!video)
            return;
        const loadHeroVideo = () => {
            if (video.querySelector("source"))
                return; // Already loaded
            const source = document.createElement("source");
            source.src = VIDEO_URL;
            source.type = "video/webm";
            video.appendChild(source);
            video.load();
            video.play().catch(() => {
                // ignore autoplay errors
            });
        };
        let idleId = null;
        let timeoutId = null;
        if (typeof window !== "undefined") {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(() => {
                    loadHeroVideo();
                });
                timeoutId = setTimeout(() => {
                    loadHeroVideo();
                }, 1500);
            }
            else {
                timeoutId = setTimeout(loadHeroVideo, 1500);
            }
        }
        const handlePlaying = () => {
            setVideoActive(true);
        };
        video.addEventListener("playing", handlePlaying);
        return () => {
            if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            video.removeEventListener("playing", handlePlaying);
        };
    }, []);
    return (<div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Premium dark gradient placeholder visible immediately */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#110e1a] via-[#04020a] to-black" style={{ opacity: 0.9 }}/>
      <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster="/opengraph.jpg" className="w-full h-full object-cover transition-opacity duration-[1500ms]" style={{ opacity: videoActive ? 0.75 : 0 }}/>
      {/* Light vignette — keeps text legible without masking the video */}
      <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
        }}/>
      {/* Bottom fade so lower sections don't clash with the video */}
      <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(to bottom, transparent, #000)" }}/>
    </div>);
}
