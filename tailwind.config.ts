import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF3E6",
        secondary: "#525C39",
        accent1: "#F1D5BD",
        accent2: "#EAA037",
        accent3: "#000000"
      },
      fontFamily: {
        sancreek: ['"Sancreek"', 'serif'],
        epilogue: ['"Epilogue"', 'serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
