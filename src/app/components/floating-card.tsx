"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/cn";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  index?: number;
  onHoverChange?: (hovering: boolean) => void;
}

const MAX_TILT_DEG = 8;
const IDLE_FLOAT_DISTANCE = 8;

const liftVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 10px 20px -10px rgba(0,0,0,0.18)",
  },
  lifted: {
    scale: 1.03,
    y: -6,
    boxShadow: "0 26px 40px -12px rgba(0,0,0,0.28)",
  },
};

const shadowVariants = {
  rest: { opacity: 0.18, scaleX: 0.85, y: 10, filter: "blur(18px)" },
  lifted: { opacity: 0.32, scaleX: 0.7, y: 16, filter: "blur(10px)" },
};

const hoverTransition = { type: "spring" as const, stiffness: 300, damping: 25 };

export function FloatingCard({
  children,
  className,
  style,
  index = 0,
  onHoverChange,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Stiff enough to track the cursor closely, damped enough to avoid jitter.
  const tiltSpringConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]),
    tiltSpringConfig,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    tiltSpringConfig,
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
    onHoverChange?.(false);
  }

  return (
    // Hover is tracked on this outer, untransformed div rather than on the
    // tilted child below: that child's rotateX/rotateY shifts its rendered
    // box under the cursor as the spring settles, which made mouseenter/
    // mouseleave on it fire repeatedly near the tilt's zero-crossing.
    <div
      className="isolate"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -IDLE_FLOAT_DISTANCE, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.15,
              }
        }
      >
        <motion.div
          ref={ref}
          initial="rest"
          whileHover={prefersReducedMotion ? undefined : "lifted"}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className={cn("relative", className)}
            style={style}
            variants={liftVariants}
            transition={hoverTransition}
          >
            {/* Tinted contact shadow: reads as a physical object floating above the page.
                Fixed height (not %) — an absolutely positioned child's percentage height
                resolves against the nearest ancestor with a definite height when its own
                parent is auto-height, which here meant the viewport, not the card. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 bottom-0 -z-10 h-6 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
              variants={shadowVariants}
              transition={hoverTransition}
            />
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
