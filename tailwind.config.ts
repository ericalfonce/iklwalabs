import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-deep": "var(--navy-deep)",
        navy: "var(--navy)",
        "navy-mid": "var(--navy-mid)",
        cyan: "var(--cyan)",
        "cyan-dim": "var(--cyan-dim)",
        white: "var(--white)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
