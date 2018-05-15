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

// TODO: add prev/next navigation
export default function Lab({ data }) {
  const { lab } = data;
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: lab.html }} />
    </Container>
  );
}

export const pageQuery = graphql`
  query LabQuery($slug: String!) {
    lab: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;
