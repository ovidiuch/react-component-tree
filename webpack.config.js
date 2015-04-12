var path = require('path');

module.exports = {
  entry: './entry.js',
  externals: {
    'lodash': 'lodash',
    'react': 'react'
  },
  module: {
    loaders: [{
      test: /load-child-component\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
