module.exports = {
  plugins: [require('autoprefixer')].concat(
    process.env.NODE_ENV === 'production' ? [require('cssnano')] : []
  )
};
