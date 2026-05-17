import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#03050b",
        night: "#070914",
        panel: "rgba(8, 12, 25, 0.72)",
        line: "rgba(255, 255, 255, 0.12)",
        mint: "#55f7d2",
        aqua: "#37d7ff",
        signal: "#a66cff",
        violet: "#7c3dff",
        coral: "#ff4ecd"
      },
      boxShadow: {
        glass: "0 28px 110px rgba(0, 0, 0, 0.52)",
        glow: "0 0 42px rgba(55, 215, 255, 0.28)",
        violet: "0 0 54px rgba(124, 61, 255, 0.28)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
