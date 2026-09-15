import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Smartphone, QrCode } from "lucide-react";

export function TableVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property assignment strictly needed by iOS Safari / Mobile Chrome
    video.defaultMuted = true;
    video.muted = true;

    // Attempt early autoplay
    const tryAutoplay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy prevented playback until user tap
            setIsPlaying(false);
          });
      }
    };

    tryAutoplay();

    // Intersection observer with small threshold for mobile responsiveness
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryAutoplay();
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl mx-auto"
    >
      {/* Ambient Warm Atmosphere Glow behind player */}
      <div className="absolute -inset-4 sm:-inset-8 pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-full rounded-[2.5rem] opacity-50 blur-[60px]"
          style={{
            background: "radial-gradient(ellipse at center, #E8D3BE 0%, #EFE7DA 45%, transparent 75%)",
          }}
        />
      </div>

      {/* Outer Luxury Frame */}
      <div className="relative p-2.5 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8] border border-[#E4DBCF] shadow-2xl shadow-[#332A24]/8 transition-all duration-300">
        
        {/* Top Header Pill Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 mb-2 sm:mb-3 border-b border-[#E4DBCF]/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C98F6B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9A6548]" />
            </span>
            <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#332A24] font-semibold">
              Live Table Scan Experience
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#766A5F] font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#9A6548]" />
            <span>0 App Installs • Instant Safari / Chrome Launch</span>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#241C18] border border-[#E4DBCF]/80 shadow-inner group">
          
          <video
            ref={videoRef}
            src="/mp4.mp4"
            poster="/video-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Top Left Floating Tag */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#E4DBCF] shadow-md flex items-center gap-2 text-[11px] font-mono text-[#332A24]">
              <QrCode className="w-3.5 h-3.5 text-[#9A6548]" />
              <span>Standee: Table 04</span>
            </div>
          </div>

          {/* Top Right Floating Tag */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-[#332A24]/80 backdrop-blur-md border border-white/10 shadow-md flex items-center gap-2 text-[11px] font-mono text-[#FFFDF8]">
              <Smartphone className="w-3.5 h-3.5 text-[#C98F6B]" />
              <span>Native Camera Scan</span>
            </div>
          </div>

          {/* Center Play/Pause Touch Overlay (visible when paused or hover) */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
              !isPlaying ? "opacity-100 bg-black/35" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              type="button"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#332A24] backdrop-blur-md border border-[#E4DBCF] shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-[#9A6548] fill-current" />
              ) : (
                <Play className="w-6 h-6 text-[#9A6548] fill-current translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            
            {/* Quick Play & Mute Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2 rounded-full bg-[#FFFDF8]/20 hover:bg-[#FFFDF8]/40 text-[#FFFDF8] backdrop-blur-xs border border-white/10 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-2 rounded-full bg-[#FFFDF8]/20 hover:bg-[#FFFDF8]/40 text-[#FFFDF8] backdrop-blur-xs border border-white/10 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <span className="text-[11px] font-mono text-white/90 hidden sm:inline-block ml-1">
                Point phone camera at table standee to launch digital menu
              </span>
            </div>

            {/* Progress Bar Line */}
            <div className="w-24 sm:w-36 h-1 bg-white/20 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-[#C98F6B] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

        </div>

        {/* 3 Value Pillars below Video Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 sm:pt-4">
          <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E4DBCF]/80">
            <div className="text-[10px] font-mono font-semibold tracking-wider text-[#9A6548] uppercase mb-1">
              01 • Zero Friction
            </div>
            <div className="text-xs font-medium text-[#332A24] mb-0.5">Works on Any Smartphone</div>
            <p className="text-[11px] text-[#766A5F] leading-snug font-light">
              Guests scan with their built-in iOS Camera or Google Lens. No apps to install.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E4DBCF]/80">
            <div className="text-[10px] font-mono font-semibold tracking-wider text-[#9A6548] uppercase mb-1">
              02 • Precision Sync
            </div>
            <div className="text-xs font-medium text-[#332A24] mb-0.5">Table-Tagged Orders</div>
            <p className="text-[11px] text-[#766A5F] leading-snug font-light">
              QR identifies the exact table number automatically so staff know where to serve.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#E4DBCF]/80">
            <div className="text-[10px] font-mono font-semibold tracking-wider text-[#9A6548] uppercase mb-1">
              03 • Premium Craft
            </div>
            <div className="text-xs font-medium text-[#332A24] mb-0.5">Tactile Standee Materials</div>
            <p className="text-[11px] text-[#766A5F] leading-snug font-light">
              Walnut wood, brushed brass, matte ceramic or acrylic table stands customized for your brand.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
