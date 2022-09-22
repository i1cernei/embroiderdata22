/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'right-0',
    'left-0',
    'rotate-90',
  ],
  theme: {
    extend: {
      height: {
        '100': '28rem',
        '110': '30rem',
        '300': '1080px',
      },
      width: {
        '100': '28rem',
        'extra': '140%'
      }
    },
  },
  plugins: [],
}
