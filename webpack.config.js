var path = require('path');

module.exports = {
  entry: './entry.js',
  externals: {
    'lodash': 'lodash',
    'react': 'react'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
