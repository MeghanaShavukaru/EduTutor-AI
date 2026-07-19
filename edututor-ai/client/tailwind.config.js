/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#39ff14',
        pinkneon: '#ff00c8',
        dark: '#0d0d0d',
      },
    },
  },
  plugins: [],
};
