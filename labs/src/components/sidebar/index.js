import React from 'react';
import styled from 'react-emotion';
import GatsbyLink from 'gatsby-link';
import ExternalLinkIcon from 'react-icons/lib/fa/external-link-square';

const Container = styled.div({
  display: 'flex',
  overflowX: 'scroll',
  backgroundColor: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
  padding: '1rem 0.5rem',
  '@media only screen and (min-width: 768px)': {
    flexDirection: 'column',
    overflowX: 'auto',
    minWidth: 250,
  },
});

const Link = styled(GatsbyLink)({
  color: 'white',
  display: 'inline-block',
  fontSize: 14,
  whiteSpace: 'nowrap',
  padding: '0.125rem 0.25rem',
  margin: '0 0.5rem',
  textDecorationSkip: 'ink',
  transition: '175ms ease-in-out',
  boxSizing: 'border-box',
  position: 'relative',
  ':hover, &.active': {
    color: '#d8292f',
    textDecoration: 'none',
  },
  '@media only screen and (min-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    margin: '0.25rem 0.5rem',
    width: '100%',
    whiteSpace: 'normal',
    '::after': {
      content: JSON.stringify(''),
    },
  },
  '&.active::after': {
    position: 'absolute',
    right: 0,
    height: 0,
    width: 0,
    borderTop: '12px solid transparent',
    borderBottom: '12px solid transparent',
    borderRight: '12px solid white',
  },
});

Link.defaultProps = {
  activeClassName: 'active',
};

const A = styled(Link)({}).withComponent('a');

const Title = styled.h2({
  color: 'white',
  display: 'none',
  fontSize: 18,
  margin: 0,
  marginBottom: '1rem',
  textTransform: 'uppercase',
  '@media only screen and (min-width: 768px)': {
    display: 'block',
  },
});

const LinkIcon = styled(ExternalLinkIcon)({
  marginLeft: '0.5rem',
});

export function Sidebar({ labs, links }) {
  return (
    <Container>
      {links.map(({ title, links: subLinks }) => (
        <React.Fragment key={title}>
          <Title>{title}</Title>
          {subLinks.map(({ title: subTitle, href }) => (
            <A href={href} key={href} target="_blank" rel="noopener">
              {subTitle}
              <LinkIcon />
            </A>
          ))}
        </React.Fragment>
      ))}
      <Title>Labs</Title>
      {labs.map(({ node: lab }) => {
        return (
          <Link to={lab.fields.slug} key={lab.fields.slug}>
            {lab.frontmatter.title}
          </Link>
        );
      })}
    </Container>
  );
}
