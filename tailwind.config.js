/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Shad: {
          400: "#f5f7ff",
        },
        lightblue: {
          200: "#D5E6FB",
        },
        class1: {
          50: "#69b8d9",
        },
        class2: {
          50: "#94b4eb",
        },
        class3: {
          50: "#f8b26a",
        },
        class4: {
          50: "#a37a93",
        },
        class5: {
          50: "#475985",
        },
        class6: {
          50: "#8b9748",
        },
        class7: {
          50: "#244f78",
        },
        class8: {
          50: "#fe8137",
        },
        class9: {
          50: "#da4561",
        },
        class10: {
          50: "#9a5652",
        },
        darkblue: {
          500: "#020D46",
          300: "#01136d"
        },
        student: {
          900: "#F3797E",
        },
        faculty: {
          900: "#7DA0FA",
        },
        box1: {
          100: "#FF7575",
        },
        f1: {
          200: "#f3797e",
        },
      },
    },
  },
  plugins: [
   
  ],
};
