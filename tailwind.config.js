/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
  theme: {
    extend: {
      colors: {
        primary_light: colors.lightBlue,
        primary: '#151e3b',
        secondary: '#ff4833',
        warn: colors.yellow,
        danger: colors.red
      },
    },
  }
}