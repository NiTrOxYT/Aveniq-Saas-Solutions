const items = [
  "SaaS Development",
  "AI Automation",
  "Web Applications",
  "Mobile Apps",
  "Business Systems",
  "UI/UX Design",
  "Cloud Architecture",
  "API Development",
  "Data Pipelines",
  "Growth Tooling",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y z-10" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="flex animate-marquee gap-0 py-[13px]" style={{ whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span
              className="w-[3px] h-[3px] rounded-full shrink-0"
              style={{ background: "#6750A4", boxShadow: "0 0 5px #6750A4" }}
            />
            <span
              className="text-[10px] font-medium tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "Barlow, sans-serif" }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
      {/* Left + right edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, #000, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, #000, transparent)" }} />
    </div>
  );
}
