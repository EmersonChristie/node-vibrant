const path = require('path')
const webpack = require("webpack")

const entry = './src/bundle.ts'
const entryWithWorker = './src/bundle-worker.ts'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: {
    'vibrant': entry,
    'vibrant.min': entry,
    'vibrant.worker': entryWithWorker,
    'vibrant.worker.min': entryWithWorker
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.worker.ts$/,
        loader: 'worker-loader',
        options: { publicPath: '/dist/' }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
          configFile: 'tsconfig.browser.json'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Vibrant',
    libraryTarget: 'umd'
  }
}