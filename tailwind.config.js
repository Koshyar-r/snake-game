/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'MainFont': ['Mooli', 'sans-serif'],
    },
    screens: {
      'md': {'max': '800px'}
    },
    extend: {
      gridTemplateColumns: {
        '30': 'repeat(30, 1fr) / repeat(30, 1fr)'
      },
    },
  },
  plugins: [],
}