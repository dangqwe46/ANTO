const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration}  */
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'ant_lib.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ANT',
      type: 'assign-properties'
    },
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'tsx'],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
