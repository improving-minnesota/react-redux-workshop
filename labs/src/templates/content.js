import React from 'react';
import styled, { injectGlobal } from 'react-emotion';
import 'prismjs/themes/prism-okaidia.css';
import GatsbyLink from 'gatsby-link';
import ChevronRight from 'react-icons/lib/fa/chevron-right';

import { Button } from '@objectpartners/components';

const Container = styled.div({
  fontFamily: 'sans-serif',
  maxWidth: '100%',
  a: {
    color: '#d8292f',
  },
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

injectGlobal`
  .gatsby-code-title + .gatsby-highlight > pre {
    border-radius: 0;
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }

  .gatsby-code-title {
    margin-bottom: -0.6rem;
    padding: 0.5em 1em;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
   
    background-color: black;
    color: white;
    z-index: 0;
   
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }
`;
