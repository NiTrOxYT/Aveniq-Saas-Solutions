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
      // Native HLS (Safari) — browser handles quality selection
      video.src = HLS_URL;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        // Force highest quality immediately — no warm-up at low res
        startLevel: -1,
        capLevelToPlayerSize: false,
        // Seed the bandwidth estimate at 20 Mbps so ABR picks max quality instantly
        abrEwmaDefaultEstimate: 20_000_000,
        // Keep a large buffer so playback is smooth without quality drops
        maxBufferLength: 60,
        maxMaxBufferLength: 120,
        // Don't downgrade quality mid-playback unless the connection is truly slow
        abrBandWidthFactor: 0.98,
        abrBandWidthUpFactor: 0.98,
      });

      hls.loadSource(HLS_URL);
      hls.attachMedia(video);

      // Once the manifest is parsed, lock to the highest available level
      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const highest = data.levels.length - 1;
        hls.startLevel = highest;
        hls.currentLevel = highest;
      });

      return () => hls.destroy();
    }
  }, []);

  return (
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
      {/* Light vignette — keeps text legible without masking the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      {/* Bottom fade so lower sections don't clash with the video */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
      />
    </div>
  );
}
