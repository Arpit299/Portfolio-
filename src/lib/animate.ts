import type { AnimationVariant } from "@/types";

/**
 * Scroll reveal animation - fade in + slide up
 */
export const scrollRevealVariant: AnimationVariant = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

/**
 * Staggered container for children
 */
export const staggerContainerVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
};

/**
 * Individual item in staggered animation
 */
export const staggerItemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/**
 * Hero typing animation - for name reveal
 */
export const typingContainerVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const typingCharacterVariant = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Cursor blink animation
 */
export const cursorVariant = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  },
};

/**
 * Hover effects for cards and buttons
 */
export const hoverScaleVariant = {
  initial: { scale: 1 },
  whileHover: {
    scale: 1.05,
    boxShadow: "0 0 25px rgba(100, 255, 218, 0.15)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * Glow pulse animation on hover
 */
export const glowPulseVariant = {
  initial: {
    boxShadow: "0 0 0 rgba(100, 255, 218, 0)",
  },
  whileHover: {
    boxShadow: [
      "0 0 0 rgba(100, 255, 218, 0)",
      "0 0 25px rgba(100, 255, 218, 0.15)",
      "0 0 0 rgba(100, 255, 218, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

/**
 * Timeline entry animation - slide from sides
 */
export const timelineEntryVariant = (fromLeft: boolean) => ({
  initial: {
    opacity: 0,
    x: fromLeft ? -40 : 40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
});

/**
 * Timeline dot pulse animation
 */
export const timelineDotVariant = {
  initial: { scale: 1 },
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

/**
 * Parallax scroll animation
 */
export const parallaxVariant = (scrollValue: number) => ({
  y: scrollValue * 0.5,
  transition: {
    duration: 0.1,
  },
});

/**
 * Page transition - fade in
 */
export const pageTransitionVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Floating particles animation
 */
export const floatingVariant = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
    },
  },
};

/**
 * Rotating SVG animation
 */
export const rotateVariant = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      linear: true,
    },
  },
};

/**
 * Pulsing core animation
 */
export const pulseVariant = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

/**
 * Form field focus animation
 */
export const formFieldVariant = {
  initial: { borderColor: "rgba(100, 255, 218, 0)" },
  focus: {
    borderColor: "rgba(100, 255, 218, 0.5)",
    boxShadow: "0 0 15px rgba(100, 255, 218, 0.1)",
  },
};

/**
 * Success state animation
 */
export const successVariant: AnimationVariant = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * Error state animation
 */
export const errorVariant: AnimationVariant = {
  initial: { x: 0 },
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Loading spinner animation
 */
export const spinnerVariant = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

/**
 * AI visualization ring animation - for multiple rings
 */
export const ringVariant = (delay: number) => ({
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 3,
      delay,
      repeat: Infinity,
    },
  },
});
