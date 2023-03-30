/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE8',
        secondary: '#0984E3',
        error: '#E52E5C',
        success: '#37B16D',
        warning: '#FFC73F',
        dark: '#2B2B2B',
        light: '#FFFFFF'
      }
    },
  },
  plugins: [],
}