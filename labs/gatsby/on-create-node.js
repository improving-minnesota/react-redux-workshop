const slugify = require('limax');
const path = require('path');

const handleNodeSourceType = ({ createNodeField }) => {
  return {
    Lab(node) {
      createNodeField({ node, name: 'type', value: 'lab' });
      createNodeField({
        node,
        name: 'slug',
        value: `/labs/${slugify(node.frontmatter.title)}`,
      });
    },
    Slide(node) {
      const folder = path
        .basename(path.dirname(node.fileAbsolutePath))
        .replace(/^\d+-/, '');
      createNodeField({ node, name: 'type', value: 'slide' });
      createNodeField({
        node,
        name: 'slug',
        value: `/slides/${slugify(folder)}/${slugify(node.frontmatter.title)}`,
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
