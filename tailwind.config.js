const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fill: {
      current: 'currentColor',
    },
    extend: {},
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.blueGray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.amber,
      green: colors.green,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


