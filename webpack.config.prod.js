/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')

delete common.plugins

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: ['./src/index.tsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index_prod.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
})
