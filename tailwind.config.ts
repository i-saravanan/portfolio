import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#090b0f",
        panel: "rgba(12, 18, 24, 0.66)",
        line: "rgba(255, 255, 255, 0.12)",
        mint: "#4df0bd",
        aqua: "#5dd8ff",
        signal: "#ffcf5a",
        coral: "#ff6f61"
      },
      boxShadow: {
        glass: "0 20px 80px rgba(0, 0, 0, 0.38)",
        glow: "0 0 38px rgba(77, 240, 189, 0.2)"
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
