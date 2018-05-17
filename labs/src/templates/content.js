import React from 'react';
import styled from 'react-emotion';
import 'prismjs/themes/prism-okaidia.css';
import GatsbyLink from 'gatsby-link';
import ChevronRight from 'react-icons/lib/fa/chevron-right';

import { Button } from '@objectpartners/components';

const Container = styled.div({
  fontFamily: 'sans-serif',
  maxWidth: '100%',
  pre: {
    wordWrap: 'break-word',
  },
});

const Link = styled(Button)({
  display: 'block',
  margin: '1rem auto',
  position: 'relative',
  textAlign: 'center',
  textDecoration: 'none',
  width: '100%',
  ':hover': {
    svg: {
      color: '#1a1a1a',
    },
  },
  '@media only screen and (min-width: 768px)': {
    maxWidth: '50%',
  },
}).withComponent(GatsbyLink);

const NextLabIcon = styled(ChevronRight)({
  color: 'white',
  position: 'absolute',
  right: 8,
});

export default function Content({ data, pathContext }) {
  const { content } = data;
  const { next } = pathContext;

  const isLab = content.fields.type === 'lab';
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
      {isLab && next.node ? (
        <Link to={next.node.fields.slug}>
          {next.node.frontmatter.title}
          <NextLabIcon />
        </Link>
      ) : null}
    </Container>
  );
}

export const pageQuery = graphql`
  fragment ContentFragment on MarkdownRemark {
    fields {
      slug
      type
    }
    frontmatter {
      title
    }
    html
  }

  query ContentQuery($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...ContentFragment
    }
  }
`;
