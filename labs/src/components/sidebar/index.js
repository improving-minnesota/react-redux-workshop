import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import GatsbyLink from 'gatsby-link';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { HEADER_HEIGHT, MEDIA, Z_INDEX } from '../../style';

const Container = styled.div({
  display: 'flex',
  overflowX: 'scroll',
  backgroundColor: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
  padding: '1rem 0.5rem',
  whiteSpace: 'nowrap',
  zIndex: Z_INDEX('sidebar'),
  [MEDIA.greaterThan('large')]: {
    position: 'fixed',
    padding: '2rem 0.5rem',
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    top: HEADER_HEIGHT,
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
  [MEDIA.greaterThan('large')]: {
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

const Links = styled.div({
  display: 'none',
  [MEDIA.greaterThan('large')]: {
    display: 'inline-block',
  },
});

const A = styled(Link)().withComponent('a');

const Title = styled.h2({
  color: 'white',
  display: 'none',
  fontSize: 18,
  margin: 0,
  marginBottom: '1rem',
  textTransform: 'uppercase',
  [MEDIA.greaterThan('large')]: {
    display: 'block',
  },
});

const LinkIcon = styled(FaExternalLinkAlt)({
  marginLeft: '0.5rem',
});

const Group = ({ className, title, items }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <Links className={className}>
      <Title>{title}</Title>
      {items.map(({ node }) => {
        return (
          <Link to={node.fields.slug} key={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
        );
      })}
    </Links>
  );
};

export function Sidebar({ agendas, labs, externalLinks, tips }) {
  return (
    <Container>
      {externalLinks.length > 0 && (
        <Links type="sub">
          <Title>External Links</Title>
          {externalLinks.map(({ href, title }) => {
            return (
              <A href={href} key={href} target="_blank" rel="noopener">
                {title}
                <LinkIcon />
              </A>
            );
          })}
        </Links>
      )}
      <Group title="Agenda" items={agendas} />
      <Group title="Tips" items={tips} />
      <Group title="Labs" css={{ display: 'inline-block' }} items={labs} />
    </Container>
  );
}

Sidebar.defaultProps = {
  agendas: [],
  labs: [],
  externalLinks: [],
  tips: [],
};

Sidebar.propTypes = {
  labs: PropTypes.array.isRequired,
  agendas: PropTypes.array,
  externalLinks: PropTypes.array,
  tops: PropTypes.array,
};
