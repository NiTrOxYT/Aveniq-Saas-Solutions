import { motion, useReducedMotion } from "framer-motion";

interface BotanicalBranchProps {
  side: "left" | "right";
  className?: string;
}

export function BotanicalBranch({ side, className = "" }: BotanicalBranchProps) {
  const reduce = useReducedMotion();
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`pointer-events-none select-none absolute z-10 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        animate={
          reduce
            ? {}
            : {
                y: isLeft ? [0, -8, 0] : [0, 8, 0],
                rotate: isLeft ? [0, 1.5, 0] : [0, -1.5, 0],
              }
        }
        transition={{
          duration: isLeft ? 7 : 8.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: isLeft ? "top left" : "top right" }}
      >
        <svg
          viewBox="0 0 320 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-32 sm:w-48 md:w-64 lg:w-76 xl:w-84 h-auto drop-shadow-sm ${
            isLeft ? "" : "scale-x-[-1]"
          }`}
        >
          <defs>
            {/* Stem & Leaf Gradients */}
            <linearGradient id={`stemGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#89947B" />
              <stop offset="50%" stopColor="#6C7A5E" />
              <stop offset="100%" stopColor="#556348" />
            </linearGradient>

            <linearGradient id={`leafGrad1_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A4B196" />
              <stop offset="100%" stopColor="#78876A" />
            </linearGradient>

            <linearGradient id={`leafGrad2_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAC5AD" />
              <stop offset="100%" stopColor="#89977B" />
            </linearGradient>

            <linearGradient id={`berryGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2A684" />
              <stop offset="60%" stopColor="#C98F6B" />
              <stop offset="100%" stopColor="#9A6548" />
            </linearGradient>

            <linearGradient id={`petalGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF8" />
              <stop offset="80%" stopColor="#F5ECE1" />
              <stop offset="100%" stopColor="#EADDCF" />
            </linearGradient>

            <filter id={`softGlow_${side}`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#332A24" floodOpacity="0.04" />
            </filter>
          </defs>

          <g filter={`url(#softGlow_${side})`}>
            {/* Main Arching Stem */}
            <path
              d="M -20 20 Q 80 120 120 240 T 160 420 Q 175 510 140 600"
              stroke={`url(#stemGrad_${side})`}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Secondary Offshoot Stems */}
            <path
              d="M 65 105 Q 130 90 185 115"
              stroke={`url(#stemGrad_${side})`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 98 190 Q 170 180 230 210"
              stroke={`url(#stemGrad_${side})`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 135 290 Q 210 300 260 340"
              stroke={`url(#stemGrad_${side})`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 152 385 Q 220 410 250 470"
              stroke={`url(#stemGrad_${side})`}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />

            {/* ── LEAVES ── */}
            {/* Top Branch Leaves */}
            <path
              d="M 185 115 C 215 95 240 105 255 120 C 235 135 205 130 185 115 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.9"
            />
            <path
              d="M 140 98 C 165 70 190 75 205 90 C 185 105 155 108 140 98 Z"
              fill={`url(#leafGrad2_${side})`}
              opacity="0.85"
            />

            {/* Mid Branch 1 Leaves */}
            <path
              d="M 230 210 C 265 190 295 200 310 220 C 285 235 255 230 230 210 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.92"
            />
            <path
              d="M 175 185 C 205 160 235 168 250 185 C 225 200 195 198 175 185 Z"
              fill={`url(#leafGrad2_${side})`}
              opacity="0.88"
            />
            <path
              d="M 120 220 C 145 235 160 260 160 275 C 140 268 125 248 120 220 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.85"
            />

            {/* Mid Branch 2 Leaves */}
            <path
              d="M 260 340 C 295 330 318 348 322 368 C 295 375 270 362 260 340 Z"
              fill={`url(#leafGrad2_${side})`}
              opacity="0.9"
            />
            <path
              d="M 205 295 C 235 280 265 290 278 308 C 252 320 225 312 205 295 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.88"
            />

            {/* Lower Branch Leaves */}
            <path
              d="M 250 470 C 275 490 278 518 268 535 C 248 518 245 492 250 470 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.85"
            />
            <path
              d="M 190 400 C 225 410 240 435 242 452 C 218 450 200 430 190 400 Z"
              fill={`url(#leafGrad2_${side})`}
              opacity="0.85"
            />
            <path
              d="M 140 600 C 158 625 155 645 142 655 C 130 642 128 620 140 600 Z"
              fill={`url(#leafGrad1_${side})`}
              opacity="0.8"
            />

            {/* ── COFFEE BERRIES / BOTANICAL BUDS ── */}
            <circle cx="132" cy="188" r="4.5" fill={`url(#berryGrad_${side})`} />
            <circle cx="140" cy="195" r="3.8" fill={`url(#berryGrad_${side})`} />
            <circle cx="198" cy="292" r="4.2" fill={`url(#berryGrad_${side})`} />
            <circle cx="206" cy="300" r="3.6" fill={`url(#berryGrad_${side})`} />
            <circle cx="178" cy="392" r="4" fill={`url(#berryGrad_${side})`} />

            {/* ── DELICATE BLOSSOMS / FLOWER PETALS ── */}
            {/* Blossom 1 (Near Top Offshoot) */}
            <g transform="translate(182, 114) scale(0.9)">
              <ellipse cx="0" cy="-7" rx="4" ry="7" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="6" cy="-2" rx="4" ry="7" transform="rotate(72 6 -2)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="4" cy="6" rx="4" ry="7" transform="rotate(144 4 6)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-4" cy="6" rx="4" ry="7" transform="rotate(216 -4 6)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-6" cy="-2" rx="4" ry="7" transform="rotate(288 -6 -2)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <circle cx="0" cy="1" r="2.5" fill="#C98F6B" />
              <circle cx="0" cy="1" r="1.2" fill="#9A6548" />
            </g>

            {/* Blossom 2 (Near Middle Branch) */}
            <g transform="translate(228, 208) scale(1.05)">
              <ellipse cx="0" cy="-8" rx="4.5" ry="8" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="7" cy="-3" rx="4.5" ry="8" transform="rotate(72 7 -3)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="5" cy="7" rx="4.5" ry="8" transform="rotate(144 5 7)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-5" cy="7" rx="4.5" ry="8" transform="rotate(216 -5 7)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-7" cy="-3" rx="4.5" ry="8" transform="rotate(288 -7 -3)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <circle cx="0" cy="1" r="3" fill="#C98F6B" />
              <circle cx="0" cy="1" r="1.5" fill="#9A6548" />
            </g>

            {/* Blossom 3 (Near Lower Branch) */}
            <g transform="translate(258, 338) scale(0.85)">
              <ellipse cx="0" cy="-7" rx="4" ry="7" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="6" cy="-2" rx="4" ry="7" transform="rotate(72 6 -2)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="4" cy="6" rx="4" ry="7" transform="rotate(144 4 6)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-4" cy="6" rx="4" ry="7" transform="rotate(216 -4 6)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <ellipse cx="-6" cy="-2" rx="4" ry="7" transform="rotate(288 -6 -2)" fill={`url(#petalGrad_${side})`} stroke="#E4DBCF" strokeWidth="0.6" />
              <circle cx="0" cy="1" r="2.5" fill="#C98F6B" />
              <circle cx="0" cy="1" r="1.2" fill="#9A6548" />
            </g>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function BotanicalDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {/* Left Top Botanical Branch */}
      <BotanicalBranch
        side="left"
        className="-left-6 sm:-left-4 md:left-0 top-16 sm:top-24 md:top-28 opacity-80"
      />

      {/* Right Top Botanical Branch */}
      <BotanicalBranch
        side="right"
        className="-right-6 sm:-right-4 md:right-0 top-24 sm:top-32 md:top-36 opacity-80"
      />
    </div>
  );
}
