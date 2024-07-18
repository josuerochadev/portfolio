module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-custom-properties'),
    require('postcss-nesting'),
  ]
}