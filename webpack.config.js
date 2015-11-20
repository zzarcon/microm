module.exports = {
  entry: './microm.js',
  output: {
    publicPath: 'http://localhost:8090/assets',
    path: './dist',
    filename: 'microm.js',
    libraryTarget: 'umd',
    library: 'Microm'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  }
};