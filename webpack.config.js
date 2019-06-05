const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    'public/ui': './src/ui/index.js',
    backend: './src/backend/server.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }]
  },
  plugins: [
    new CopyPlugin([{
      from: './src/ui/index.html', to: 'public/index.html'
    }])
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};
