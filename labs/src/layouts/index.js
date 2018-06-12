import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import Link from 'gatsby-link';
import SlideshowIcon from 'react-icons/lib/md/slideshow';

import { Header, Footer } from '@objectpartners/components';

import 'normalize.css';

import { Sidebar } from '../components';
import { MEDIA } from '../style';

const HEADER_HEIGHT = 102;
const FOOTER_HEIGHT = 157;
const SIDEBAR_WIDTH = 250;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const SidebarContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Roboto, sans-serif',
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  '@media only screen and (min-width: 768px)': {
    flexDirection: 'row',
  },
});

const Content = styled.div({
  display: 'flex',
  alignSelf: 'flex-start',
  boxSixing: 'border-box',
  margin: '0 auto',
  padding: '1rem',
  height: '100%',
  maxWidth: '100%',
  position: 'relative',
  '@media only screen and (min-width: 768px)': {
    maxWidth: '80%',
    top: HEADER_HEIGHT,
    paddingBottom: FOOTER_HEIGHT,
    paddingLeft: `calc(${SIDEBAR_WIDTH}px + 1rem)`
  },
});

const SlideIcon = styled(SlideshowIcon)({
  color: 'rgba(255, 255, 255, 0.8)',
  transition: '175ms ease-in-out',
  ':hover': {
    color: 'white',
  },
});

const FixedHeader = styled(Header)({
  [MEDIA.greaterThan('large')]: {
    position: 'fixed',
    zIndex: 3
  }
});

const StyledFooter = styled(Footer)({
  [MEDIA.greaterThan('large')]: {
    position: 'relative',
    left: SIDEBAR_WIDTH,
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`
  }
});

export default function Layout({ children, data }) {
  const { content } = data;
  return (
    <Container>
      <Helmet
        titleTemplate={`%s | Object Partners`}
        title={content.meta.title}
        meta={[
          { name: 'description', content: content.meta.description },
          { name: 'keywords', content: content.meta.keywords.join(', ') },
        ]}
      />
      <FixedHeader
        renderLogo={({ Logo }) => (
          <React.Fragment>
            <Link to="/">
              <Logo theme="light" style={{ height: 30 }} />
            </Link>
            <a
              css={{ color: 'inherit', textDecoration: 'none' }}
              href="/slidedeck"
            >
              <SlideIcon size={30} />
            </a>
          </React.Fragment>
        )}
        githubLink="https://github.com/objectpartners/react-redux-workshop"
        title="React Training"
      />
      <SidebarContainer>
        <Sidebar
          labs={data.labs.edges}
          agendas={data.agendas.edges}
          externalLinks={content.links.external}
          tips={data.tips.edges}
        />
        <Content>{children()}</Content>
      </SidebarContainer>
      <StyledFooter />
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.func,
};

export const query = graphql`
  query SiteTitleQuery {
    labs: allMarkdownRemark(
      filter: { fields: { type: { eq: "lab" } } }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }

    agendas: allMarkdownRemark(
      filter: { fields: { type: { eq: "agenda" } } }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }

    tips: allMarkdownRemark(
      filter: { fields: { type: { eq: "tip" } } }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }

    content: contentYaml {
      meta {
        description
        keywords
        title
      }

      links {
        github
        slidedeck
        external {
          href
          title
        }
      }
    }
  }
`;
