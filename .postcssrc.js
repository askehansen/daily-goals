// https://github.com/michael-ciniawsky/postcss-load-config
var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    tailwindcss('./config/tailwind.js'),
    require('autoprefixer')(),
  ]
}
