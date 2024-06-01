/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-black-ish': "#1C1816",
        'progress-bar': "#3DAB33"
      }
    },
  },
  plugins: [],
}

