var path = require('path');

module.exports = {
  entry: './entry.js',
  externals: {
    'lodash': 'lodash',
    'react': 'react'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  output: {
    libraryTarget: 'umd',
    library: 'ComponentTree',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
