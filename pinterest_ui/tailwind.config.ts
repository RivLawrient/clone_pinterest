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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      roboto: "roboto",
      roboto1: "roboto1",
      roboto2: "roboto2",
    },
    animation: {
      fade: "fade 5s",
      img: "before 500ms forwards, after 500ms 5s forwards;",
      bounce: "bouncing 2s infinite",
      rotate: "rotateAnimation 2s linear infinite",
    },
  },
  plugins: [],
};
export default config;
