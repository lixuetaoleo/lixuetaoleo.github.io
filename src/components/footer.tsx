import React from 'react';
import style from '../styles/footer.module.less';

interface IProps {
  author: string;
}

const Footer = (props: IProps) => {
  return (
    <footer className={style['footer']}>
      © {new Date().getFullYear()} {props.author}, Built with
      {` `}
      <a href='https://www.gatsbyjs.org'>Gatsby</a>
    </footer>
  );
};

export default Footer;
