import { transform } from "next/dist/build/swc/generated-native";
import { before } from "node:test";
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
      before: "before",
    },
  },
  plugins: [],
};
export default config;
