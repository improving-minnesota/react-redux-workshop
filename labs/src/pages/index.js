import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

export default function Index({ data }) {
  const { description } = data;
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: description.html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPageQuery {
    description: markdownRemark(fileAbsolutePath: { regex: "/index.md/" }) {
      html
    }
  }
`;
