const path = require('path');

module.exports = function webpackDevConfig(baseConfig) {
  return Object.assign({}, baseConfig, {
    mode: 'development',
    devServer: {
      port: 9998,
      contentBase: ['src/public', '.'].map(contentPath =>
        path.join(__dirname, contentPath)
      )
    }
  });
};
