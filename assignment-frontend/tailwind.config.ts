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
        primary: "#1F67D6",
        primary10: "rgba(31, 103, 214, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
