/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.jsx",
    "./index.jsx",
    "./Die.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tenzies: {
          bg: "#0B2434",
          dice: "#FFFFFF",
          held: "#59E391",
          text: "#FFFFFF",
          button: "#5035FF",
        },
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
