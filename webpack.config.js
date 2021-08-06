const path = require('path');

module.exports = {
  entry: './static/_src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static/assets'),
  },
};
