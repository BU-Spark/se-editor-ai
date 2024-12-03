import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        '1/6': '16.666667%',
      },
      backgroundPosition: {
        '1/6': '0% 0%',
      },
      colors: {
        'brand-red': '#801212',
        'brand-tan': '#F5F0EF',
        'main-color': '#801212',
        'login-text': '#31302F',


      }
    },
  },
  plugins: [],
};
export default config;
