const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const regexEqual = require('is-equal-regex');

const CSS_EXPR = /\.css$/;

module.exports = function webpackConfigProduction(baseConfig) {
  const rules = baseConfig.module.rules
    .filter(({ test }) => {
      return !regexEqual(test, CSS_EXPR);
    })
    .concat([
      {
        test: CSS_EXPR,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]);

  return Object.assign({}, baseConfig, {
    module: Object.assign({}, baseConfig.module, {
      rules
    }),
    plugins: baseConfig.plugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      })
    ])
  });
};
