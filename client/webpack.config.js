const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (setting) => {
  console.log(setting);
  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/', //solve the url refresh problem
      filename: 'bundle.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/public/index.html'), //This plugin will generate index.html file in the same directory where our bundle.js is created by Webpack.
      }),
      new CleanWebpackPlugin(), //A webpack plugin to remove/clean your build folder(s).
      new Dotenv({
        path: `./.env.${setting.env}`,
        systemvars: true,
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, './src'),
      port: 3000,
      // hot: false,
      compress: true,
      open: true,
      historyApiFallback: true, //tell Webpack and its configuration that it should fallback for every path to your entry point
    },
  };
};