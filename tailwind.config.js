/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        "tablet-landscape": { min: "1024px", max: "1480px" },
      },
      colors: {
        primary: {
          50: "#fef3ee",
          100: "#fde4d7",
          200: "#f9c5af",
          300: "#f59c7c",
          400: "#ef613d",
          500: "#ec4323",
          600: "#dd2b19",
          700: "#b71d17",
          800: "#921a1a",
          900: "#761918",
          950: "#3f0b0d",
        },
      },
    },
  },
  plugins: [],
};
