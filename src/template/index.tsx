import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import style from '../styles/template.module.less';

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext
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
