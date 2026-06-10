export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary orb — upper center, large, very blurred */}
      <div
        className="absolute left-1/2 rounded-full"
        style={{
          top: "-20%",
          width: "1100px",
          height: "1100px",
          background: "radial-gradient(circle at 50% 50%, rgba(103,80,164,0.22) 0%, rgba(103,80,164,0.06) 50%, transparent 72%)",
          filter: "blur(1px)",
          animation: "orb1 38s ease-in-out infinite",
          transform: "translateX(-50%)",
        }}
      />
      {/* Secondary orb — bottom right */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-18%",
          right: "-8%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle at 50% 50%, rgba(156,137,217,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
          animation: "orb2 50s ease-in-out infinite",
        }}
      />
      {/* Tertiary orb — left mid */}
      <div
        className="absolute rounded-full"
        style={{
          top: "42%",
          left: "-14%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at 50% 50%, rgba(103,80,164,0.09) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "orb3 60s ease-in-out infinite",
        }}
      />
      {/* Subtle center spotlight for hero area */}
      <div
        className="absolute left-1/2 rounded-full"
        style={{
          top: "10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at 50% 40%, rgba(103,80,164,0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
