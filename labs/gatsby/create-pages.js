const path = require('path');
const slugify = require('limax');

module.exports = function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  const labTemplate = path.resolve('src/templates/lab.js');

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
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const {
      labs,
      slides
    } = result.data;

    labs.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: labTemplate,
        context: {
          slug: node.fields.slug
        },
      });
    });
  });
};
