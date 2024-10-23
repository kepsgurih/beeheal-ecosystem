/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";
import daisyui from 'daisyui'
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
    daisyui
  ],
  daisyui: {
    themes: true,
  },
};
export default config;
