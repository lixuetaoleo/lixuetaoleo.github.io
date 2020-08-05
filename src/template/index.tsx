import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import style from '../styles/template.module.less';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div className={style['post-container']}>
        <h1>{post.frontmatter.title}</h1>
        <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
