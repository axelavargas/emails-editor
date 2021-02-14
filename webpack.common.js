const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    emailsEditor: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Emails Editor',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              require("@babel/plugin-transform-arrow-functions"),
              require("@babel/plugin-transform-modules-commonjs")
            ]
          }
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src')],
  },
  output: {
    filename: '[name].bundle.js',
    library: 'EmailsEditor',
    path: path.resolve(__dirname, 'dist'),
  },
};
