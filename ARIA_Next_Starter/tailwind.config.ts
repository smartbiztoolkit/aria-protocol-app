import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aria: {
          navy: "#0B1B2B",
          gold: "#D4AF37",
          warm: "#FAFAFA",
          gray: "#6B7280",
          teal: "#0DD3BF"
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)'],
        sans: ['var(--font-inter)']
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.45), 0 20px 40px -20px rgba(0,0,0,0.35)"
      }
    },
  },
  plugins: [],
};

export default config;
