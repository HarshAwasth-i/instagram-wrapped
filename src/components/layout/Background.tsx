import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
  className?: string;
}

function Background({ children, className = "" }: BackgroundProps) {
  return (
    <div
      className={`min-h-screen bg-[#111315] relative overflow-hidden text-white selection:bg-lime-300 selection:text-black ${className}`}
    >
      {/* Top subtle radial glow (Preserved base identity) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#4b5563_0%,transparent_38%)] opacity-80"
      />

      {/* Subtle micro-mesh grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_50%,transparent_100%)]"
      />

      {/* Dynamic ambient moving glow orb 1 (Lime / Emerald aura) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.08, 0.14, 0.09, 0.08],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full bg-lime-400 blur-[130px]"
      />

      {/* Dynamic ambient moving glow orb 2 (Deep Violet / Indigo aura) */}
      <motion.div
        animate={{
          x: [0, -90, 70, 0],
          y: [0, 60, -80, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.06, 0.12, 0.07, 0.06],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 -right-24 w-[580px] h-[580px] rounded-full bg-indigo-600 blur-[140px]"
      />

      {/* Dynamic ambient moving glow orb 3 (Warm Golden / Amber accent) */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, 40, -50, 0],
          scale: [0.9, 1.1, 0.95, 0.9],
          opacity: [0.04, 0.09, 0.05, 0.04],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-10 left-1/3 w-[460px] h-[460px] rounded-full bg-[#e8dcc0] blur-[150px]"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Background;