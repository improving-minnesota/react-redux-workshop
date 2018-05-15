const path = require('path');
const slugify = require('limax');

module.exports = function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  const contentTemplate = path.resolve('src/templates/content.js');

  return graphql(`
    {
      labs: allMarkdownRemark(
        filter: { fields: { type: { eq: "lab" } } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      agenda: allMarkdownRemark(
        filter: { fields: { type: { eq: "agenda" } } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      tips: allMarkdownRemark(
        filter: { fields: { type: { eq: "tip" } } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { agenda, labs, tips } = result.data;

    const createPages = page => {
      page.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: contentTemplate,
          context: {
            slug: node.fields.slug,
          },
        });
      });
    };

    createPages(agenda);
    createPages(labs);
    createPages(tips);
  });
};
