import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#001A42",
          50: "#F3F5F9",
          950: "#000C22",
          900: "#001A42",
          800: "#052655",
          700: "#0B3468",
          600: "#124885",
          500: "#1A5CA3",
        },
        gold: {
          DEFAULT: "#FDBD10",
          50: "#FFF8E5",
          100: "#FEEDBF",
          200: "#FEE18F",
          300: "#FDD55F",
          400: "#FDC93A",
          500: "#FDBD10",
          600: "#DE9F00",
          700: "#B37D00",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "pitch-lines":
          "linear-gradient(rgba(253,189,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(253,189,16,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        pitch: "48px 48px",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(253,189,16,0.4), 0 8px 30px rgba(0,0,0,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "expand-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-out forwards",
        "expand-line": "expand-line 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
