const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/js/**/*.js", "./content/**/*.md", "./layouts/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Helvetica, sans-serif"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'light-green': '#F6F8F5',
        'green': '#536942',
        'dark-green': '#0D2F0C'
      }
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'a': {
          color: theme('colors.dark-green'),
          textDecoration: 'underline'
        },
      })
    })
  ]
}
