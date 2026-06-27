import { motion } from "framer-motion";
import { useMemo } from "react";
import { colors } from "@/theme/colors";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  color?: string;
  density?: number;
};

type SparkleParticle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

function createParticles(count: number): SparkleParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 2,
  }));
}

export function Sparkles({
  className,
  color = colors.sparklesOnLight,
  density = 48,
}: SparklesProps) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () => createParticles(Math.min(density, 80)),
    [density],
  );

  if (reduced) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
