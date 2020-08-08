import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Footer from '../components/footer';
import style from '../styles/index.module.less';
import InstagramIcon from '../assets/instagram.svg';
import TwitterIcon from '../assets/twitter.svg';
import WeiboIcon from '../assets/weibo.svg';

const Icons = [InstagramIcon, TwitterIcon, WeiboIcon];

const IndexPage = ({ data }) => {
  const { author, description, socialMedia, title } = data.site.siteMetadata;
  console.log(style);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className={style['main']}>
        <h1 className={style['author']}>{author}</h1>
        <p className={style['description']}>{description}</p>
        <div className={style['link-to-other-page']}>
          <Link to='/post'>Blog</Link>
          <Link to='/about'>About</Link>
        </div>
        <div className={style['socialmedia']}>
          {Object.entries(socialMedia).map((item, index) => (
            <span key={item[0]}>
              <a href={item[1] as string} target='_blank'>
                <img src={Icons[index]} />
              </a>
            </span>
          ))}
        </div>
        <Footer author={author} />
      </main>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
        title
        description
        socialMedia {
          Instagram
          Twitter
          Weibo
        }
      }
    }
  }
`;

export default IndexPage;
