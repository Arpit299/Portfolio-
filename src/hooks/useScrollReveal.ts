"use client";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { AnimationVariant } from "@/types";

/**
 * Hook for scroll-triggered reveal animations
 */
export function useScrollReveal(variant: AnimationVariant, threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);

  return {
    ref,
    controls,
    initial: "initial",
    animate: controls,
    variants: variant,
  };
}

/**
 * Hook for mouse position tracking
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

/**
 * Hook for scroll position tracking
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

/**
 * Hook for intersection observer
 */
export function useIntersectionObserver(ref: React.RefObject<HTMLElement>) {
  const isVisible = useInView(ref, { once: true, amount: 0.3 });
  return isVisible;
}

/**
 * Hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
