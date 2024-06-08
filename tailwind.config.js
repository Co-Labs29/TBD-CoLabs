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
        'progress-bar': "#3DAB33",
        'lightish-purple': "#ECEBFA",
        'dark-purple': "#4233AB",
        'border-gray': "#CDCAC9",
        'lightest-green': "#ECFAEB"
      },
      screens: {
        'custom-1316': '1354px',
        'greater-med': '1024px'
      },
    },
  },
  plugins: [],
}
