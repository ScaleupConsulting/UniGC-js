const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
rules.push({
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
});

module.exports = {
  mode: process.env.DEV ? "development" : "production",
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
};
