const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
  )
});

const getExtendConfig = environment => {
  const noop = config => config;
  try {
    return require(`./webpack.config.${environment}`);
  } catch (e) {
    return noop;
  }
};

module.exports = function webpackConfig() {
  const extend = getExtendConfig(process.env.NODE_ENV);
  const base = {
    mode: 'production',
    entry: './src/index',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          use: ['babel-loader']
        },
        {
          test: /reveal\.js\/plugin\/.*\.(js|html)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
          ],
          include: [path.join(__dirname, 'node_modules')]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(pug|jade)$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'video:src']
              }
            },
            'pug-html-loader'
          ]
        },
        {
          test: /\.(md|markdown)$/,
          use: ['babel-loader', 'mdx-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg|mp4)/,
          use: ['url-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          WORKSHOP_CLIENT: JSON.stringify(process.env.WORKSHOP_CLIENT),
          WORKSHOP_DATE: JSON.stringify(process.env.WORKSHOP_DATE)
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/public/index.pug'),
        chunksSortMode: 'dependency'
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve('node_modules/reveal.js/plugin/**/*'),
          to: path.resolve('dist')
        }
      ])
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        resources: path.join(__dirname, 'resources')
      }
    }
  };

  return extend(base);
};
