import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Base colors
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",

      // Custom Kaal theme colors
      navy: {
        dark: "#020C1B",
        light: "#112240",
      },
      gold: "#FFD700",
      cyan: {
        accent: "#64FFDA",
      },
      slate: {
        DEFAULT: "#8892B0",
        light: "#CCD6F6",
      },

      // Alias for easier usage
      "navy-dark": "#020C1B",
      "navy-light": "#112240",
      "accent-cyan": "#64FFDA",
    },
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
      "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
    },
    extend: {
      backgroundImage: {
        glass: "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glow: "0 0 25px rgba(100, 255, 218, 0.15)",
        "glow-intense": "0 0 50px rgba(100, 255, 218, 0.25)",
      },
      animation: {
        "float-particles": "float 6s ease-in-out infinite",
        "typing-cursor": "cursor-blink 1s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
      keyframes: {
        "float-particles": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": {
            boxShadow: "0 0 0 0 rgba(100, 255, 218, 0.7)",
          },
          "70%": {
            boxShadow: "0 0 0 10px rgba(100, 255, 218, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(100, 255, 218, 0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
