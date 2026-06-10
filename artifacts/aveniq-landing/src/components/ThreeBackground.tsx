import { useEffect, useRef } from "react";

// ─── Geometry helpers ────────────────────────────────────────
const PHI = (1 + Math.sqrt(5)) / 2;

type V3 = [number, number, number];

const icoRaw: V3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];

const octRaw: V3[] = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
];

function scaled(verts: V3[], s: number): V3[] {
  return verts.map(([x, y, z]) => [x * s, y * s, z * s]);
}

function edges(verts: V3[], sqLen: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d2 =
        (verts[i][0] - verts[j][0]) ** 2 +
        (verts[i][1] - verts[j][1]) ** 2 +
        (verts[i][2] - verts[j][2]) ** 2;
      if (Math.abs(d2 - sqLen) < 0.08) out.push([i, j]);
    }
  }
  return out;
}

// Outer icosahedron — radius ≈ 1.8
const OUTER_V = scaled(icoRaw, 1.8);
const OUTER_E = edges(OUTER_V, 4 * 1.8 * 1.8); // edge length 3.6, sq=12.96

// Inner icosahedron — radius ≈ 0.9
const INNER_V = scaled(icoRaw, 0.95);
const INNER_E = edges(INNER_V, 4 * 0.95 * 0.95);

// Core octahedron — tiny center gem
const CORE_V = scaled(octRaw, 0.45);
const CORE_E = edges(CORE_V, 2 * 0.45 * 0.45);

// ─── 3D rotation (Euler XY) ──────────────────────────────────
function rotXY(v: V3, rx: number, ry: number): V3 {
  let [x, y, z] = v;
  // Rotate X
  const cy = Math.cos(rx), sy = Math.sin(rx);
  [y, z] = [y * cy - z * sy, y * sy + z * cy];
  // Rotate Y
  const cx = Math.cos(ry), sx = Math.sin(ry);
  [x, z] = [x * cx + z * sx, -x * sx + z * cx];
  return [x, y, z];
}

// ─── Perspective projection ──────────────────────────────────
function proj(
  v: V3, ppu: number, fovW: number, cx: number, cy: number
): [number, number, number] {
  const [x, y, z] = v;
  const d = fovW + z;
  if (d < 0.1) return [cx, cy, 0.01];
  const f = ppu * fovW / d;
  return [cx + x * f, cy - y * f, fovW / d]; // last = depth scale
}

// ─── Component ───────────────────────────────────────────────
export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to container
    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax
    let targetMX = 0, targetMY = 0;
    let smoothMX = 0, smoothMY = 0;
    const onMouse = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 0.7;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    // Scroll fade: hide once hero leaves viewport
    const heroEl = document.querySelector("#hero-anchor");
    let obs: IntersectionObserver | null = null;
    if (heroEl) {
      obs = new IntersectionObserver(
        ([entry]) => {
          container.style.opacity = entry.isIntersecting ? "1" : "0";
        },
        { threshold: 0.05 }
      );
      obs.observe(heroEl);
    }

    // Draw one set of edges with rotation + projection + depth opacity
    function drawSet(
      verts: V3[], edgeList: [number, number][],
      rx: number, ry: number,
      r: number, g: number, b: number,
      baseAlpha: number,
      ppu: number, fovW: number,
      cx: number, cy: number
    ) {
      const rotated = verts.map(v => rotXY(v, rx, ry));
      for (const [a, b] of edgeList) {
        const [ax, ay, az] = rotated[a];
        const [bx, by, bz] = rotated[b];
        const [px1, py1, s1] = proj([ax, ay, az], ppu, fovW, cx, cy);
        const [px2, py2, s2] = proj([bx, by, bz], ppu, fovW, cx, cy);

        // Depth-based alpha: closer points = brighter
        const depthA = (s1 + s2) * 0.5; // ≈ 1 at z=0, <1 farther, >1 closer
        const alpha = Math.max(0.08, Math.min(1, baseAlpha * depthA * 0.9));

        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.75;
        ctx.stroke();
      }
    }

    // Animation loop
    let raf: number;
    let t   = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t  += 0.007; // rotation speed

      // Smooth mouse follow
      smoothMX += (targetMX - smoothMX) * 0.045;
      smoothMY += (targetMY - smoothMY) * 0.045;

      const W   = canvas.width;
      const H   = canvas.height;
      const ppu = Math.min(W, H) * 0.13; // world unit → pixels
      const fov = 9;                       // perspective depth (world units)
      const cx  = W * 0.54;               // slightly right of center
      const cy  = H * 0.44;

      ctx.clearRect(0, 0, W, H);

      // Outer icosahedron — lavender, slow
      drawSet(
        OUTER_V, OUTER_E,
        t * 0.55 + smoothMY, t * 0.80 + smoothMX,
        160, 130, 240, 0.45,
        ppu, fov, cx, cy
      );
      // Inner icosahedron — deeper purple, counter-rotate
      drawSet(
        INNER_V, INNER_E,
        -t * 0.70 - smoothMY * 0.6, t * 1.05 - smoothMX * 0.6,
        120, 80, 200, 0.60,
        ppu, fov, cx, cy
      );
      // Core octahedron — bright violet, fastest
      drawSet(
        CORE_V, CORE_E,
        t * 1.20 + smoothMY * 0.3, -t * 1.55 + smoothMX * 0.3,
        200, 180, 255, 0.85,
        ppu, fov, cx, cy
      );
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      obs?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Ambient glow behind the geometry */}
      <div
        className="fixed pointer-events-none"
        style={{
          right: "-6%",
          top: "-4%",
          width: "56vw",
          height: "56vw",
          maxWidth: "760px",
          maxHeight: "760px",
          background:
            "radial-gradient(circle at 55% 44%, rgba(103,80,164,0.10) 0%, transparent 58%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      {/* 2D canvas mount */}
      <div
        ref={containerRef}
        className="fixed pointer-events-none"
        style={{
          right: "-5%",
          top: "-3%",
          width: "56vw",
          height: "56vw",
          maxWidth: "760px",
          maxHeight: "760px",
          zIndex: 1,
          transition: "opacity 0.8s ease",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </>
  );
}
