import { useEffect, useRef } from "react";

const VIDEO_URL = "/videos/hero-bg.mp4";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = VIDEO_URL;
    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // ignore autoplay errors
      }
    };

    playVideo();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/opengraph.jpg"
        className="w-full h-full object-cover"
        style={{ opacity: 0.75 }}
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
