module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'prismjs',
      {
        languages: ['groovy', 'json', 'jsx', 'flow', 'typescript'],
        plugins: ['keep-markup', 'unescaped-markup', 'normalize-whitespace'],
        theme: 'okaidia',
        css: true
      }
    ]
  ]
};
