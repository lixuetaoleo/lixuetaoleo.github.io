import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.less';
import style from '../styles/layout.module.less';
import Footer from './footer';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          title
          socialMedia {
            Instagram
            Twitter
            Weibo
          }
        }
      }
    }
  `);
  const {title, author, socialMedia} = data.site.siteMetadata
  return (
    <div style={{position:'relative', minHeight:'100vh'}}>
      <Header author={author} socialMedia={socialMedia}/>
      <main className={style['main']}>{children}</main>
      <Footer author={author} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
