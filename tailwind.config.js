/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '100': '28rem',
        '300': '1080px',
      },
      width: {
        '100': '28rem',
      }
    },
  },
  plugins: [],
}
