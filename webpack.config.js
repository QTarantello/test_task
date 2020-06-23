const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const context = path.resolve(__dirname, "src");

module.exports = {
  context,
  stats: "minimal",
  entry: "./index.jsx",
  module: {
    rules: [
      { test: /\.html$/, use: "html-loader" },
      {
        test: /\.css$/,
        include: context,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]-[hash:base64]"
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })]
};
