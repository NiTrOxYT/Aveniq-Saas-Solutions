import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_URL =
  "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 60, maxMaxBufferLength: 120 });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  return (
    /* fixed so the video covers the full viewport while the page scrolls */
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity: 0.85 }}
      />
      {/* Very light vignette — just enough to keep text legible, not to hide the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      {/* Bottom fade so content sections below hero don't clash */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, #000)",
        }}
      />
    </div>
  );
}
