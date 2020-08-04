import { Link } from 'gatsby';
import React from 'react';
import style from '../styles/header.module.less';
import InstagramIcon from '../assets/instagram.svg';
import TwitterIcon from '../assets/twitter.svg';
import WeiboIcon from '../assets/weibo.svg';

const Icons = [InstagramIcon, TwitterIcon, WeiboIcon];

interface IProps {
  author: string;
  socialMedia: object;
}

const Header = (props: IProps) => (
  <header className={style['header']}>
    <div className={style['link-to-other-page']}>
        <Link to='/post'>Blog</Link>
        <Link to='/about'>About</Link>
      </div>
    <h1 className={style['link-to-home']}>
      <Link to='/'>{props.author}</Link>
    </h1>
    <div className={style['socialmedia']}>
        {Object.entries(props.socialMedia).map((item, index) => (
          <span key={item[0]}>
            <a href={item[1] as string} target='_blank'>
              <img src={Icons[index]} />
            </a>
          </span>
        ))}
      </div>
  </header>
);

export default Header;
