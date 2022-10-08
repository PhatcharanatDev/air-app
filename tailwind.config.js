/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple" : "#081A51",
        "light-white" : "rgba(255,255,255,0.17)"
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '15': 'repeat(15 , minmax(0, 1fr))',
        '27': 'repeat(27 , minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
