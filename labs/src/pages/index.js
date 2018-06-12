import React from 'react';
import Link from 'gatsby-link';

export default function Index({ data }) {
  const { description } = data;
  return <div dangerouslySetInnerHTML={{ __html: description.html }} />;
}

export const pageQuery = graphql`
  query IndexPageQuery {
    description: markdownRemark(
      fileAbsolutePath: { regex: "/index.md/" }
    ) {
      html
    }
  }
`;
