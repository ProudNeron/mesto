const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html')
  }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: "postcss-loader"
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?)|eot|ttf|otf/,
        type: 'asset/resource'
      },
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude: /nome_modules/,
      },
    ]
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,

    open: true
  }
}
