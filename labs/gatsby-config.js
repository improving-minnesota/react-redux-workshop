const path = require('path');

module.exports = {
  siteMetadata: {
    links: [
      {
        title: 'External Links',
        links: [
          {
            href: '/slidedeck',
            title: 'Slidedeck',
          },
          {
            href: 'https://github.com/objectpartners/react-redux-timesheet',
            title: 'React Timesheet(s)',
          },
        ],
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-emotion',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'content/labs'),
        name: 'Lab',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'content'),
        name: 'BaseContent',
      },
    },
  ],
};
