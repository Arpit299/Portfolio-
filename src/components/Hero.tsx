"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";

const name = "Arpit Kumawat";

// Deterministic particle positions to avoid hydration mismatch
const particlePositions = [
  { x: 11.88, y: 95.55 },
  { x: 11.51, y: 24.92 },
  { x: 64.93, y: 0.20 },
  { x: 88.81, y: 14.92 },
  { x: 72.40, y: 37.37 },
  { x: 17.56, y: 10.45 },
  { x: 66.78, y: 41.09 },
  { x: 25.21, y: 88.24 },
  { x: 2.58, y: 60.19 },
  { x: 29.86, y: 61.06 },
  { x: 98.92, y: 44.76 },
  { x: 99.42, y: 98.21 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollYValue = useTransform(scrollY, [0, 300], [0, -80]);
  const [displayedText, setDisplayedText] = useState("");

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < name.length) {
        setDisplayedText(name.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    const aboutSection = document.querySelector("#about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: scrollYValue }}
      >
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark to-navy-light opacity-80" />

        {/* Floating Particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan rounded-full opacity-50"
            initial={{
              x: pos.x + "%",
              y: pos.y + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Glow Effect */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 mb-4 font-space-grotesk font-bold">
            <span className="text-accent-cyan">{displayedText}</span>
            <motion.span
              className="animate-pulse text-gold"
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: displayedText.length === name.length ? Infinity : 0,
              }}
            >
              |
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-slate mb-8 font-light leading-relaxed"
        >
          Architecting Intelligence.
          <br />
          <span className="text-accent-cyan font-semibold">Mastering Time & Code.</span>
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-light mb-12 max-w-2xl mx-auto"
        >
          AI Specialist | Prompt Engineer
          <br />
          Building intelligent systems that master the art of temporal evolution
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleScroll}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                process.env.NEXT_PUBLIC_GITHUB_URL || "#",
                "_blank"
              )
            }
          >
            View on GitHub
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={handleScroll}
          className="flex flex-col items-center text-accent-cyan hover:text-gold transition-colors"
        >
          <span className="text-sm font-semibold mb-2">Scroll to explore</span>
          <FiArrowDown size={24} />
        </button>
      </motion.div>
    </section>
  );
}
