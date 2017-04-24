const getWebpackConfig = require('object-partners-presentation');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const configFn = getWebpackConfig({
  resolve: {
    alias: {
      resources: path.resolve('resources')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'node_modules/reveal.js/plugin/notes/*')
      },
      {
        context: path.join(__dirname, 'src'),
        from: path.join('.*')
      }
    ])
  ]
}, {
  dirname: __dirname
});

module.exports = configFn;
