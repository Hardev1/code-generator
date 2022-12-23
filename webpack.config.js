let tailwindcss = require('tailwindcss');

module.exports = {
  module: {
    rules: [{
      test: /\.scss$|\.sass$/,
      use: [{
        loader: 'postcss-loader',
        options: {
          plugins: [
            tailwindcss('./tailwind.js')
          ]
        }
      }]
    }]
  }
}