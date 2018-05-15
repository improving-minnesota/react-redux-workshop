import React from 'react';
import styled from 'react-emotion';
import 'prismjs/themes/prism-okaidia.css';

const Container = styled.div({
  fontFamily: 'sans-serif',
  maxWidth: '100%',
  pre: {
    wordWrap: 'break-word',
  },
});

export default function Content({ data }) {
  const { content } = data;
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </Container>
  );
}

export const pageQuery = graphql`
  fragment ContentFragment on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
    }
  }

  query LabQuery($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;
