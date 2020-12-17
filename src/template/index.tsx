import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Layout from '../components/layout';
import style from '../styles/template.module.less';

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  useEffect(() => {
    // console.log('dafadsf');
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);
  return (
    <Layout>
      <div className={style['post-container']}>
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        titleImage
      }
    }
  }
`;
