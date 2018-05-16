const slugify = require('limax');
const path = require('path');

const handleNodeSourceType = ({ createNodeField }) => {
  return {
    Agenda(node) {
      createNodeField({ node, name: 'type', value: 'agenda' });
      createNodeField({
        node,
        name: 'slug',
        value: `/agenda/${slugify(node.frontmatter.title)}`,
      });
    },
    Lab(node) {
      createNodeField({ node, name: 'type', value: 'lab' });
      createNodeField({
        node,
        name: 'slug',
        value: `/labs/${slugify(node.frontmatter.title)}`,
      });
    },
    Tip(node) {
      createNodeField({ node, name: 'type', value: 'tip' });
      createNodeField({
        node,
        name: 'slug',
        value: `/tips/${slugify(node.frontmatter.title)}`,
      });
    },
  };
};

module.exports = function createNode({ node, boundActionCreators, getNode }) {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const { sourceInstanceName: type } = getNode(node.parent);
    const handleSourceType = handleNodeSourceType({ createNodeField });

    if (typeof handleSourceType[type] === 'function') {
      handleSourceType[type](node);
    }
  }
};
