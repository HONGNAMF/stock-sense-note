import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#202124",
        paper: "#fbfaf6",
        mint: "#dff4e8",
        coral: "#ffd9cc",
        lemon: "#fff1b8",
        lilac: "#e9ddff",
        skysoft: "#dcefff"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(32, 33, 36, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
