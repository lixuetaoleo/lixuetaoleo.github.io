import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import style from '../styles/post.module.less';

const randomBackgroundColor = ['#A5CAF1', '#65A3F0', '#4F9BFA', '#93C0F2'];

const PostList = ({ data }) => {
  return (
    <Layout>
      <div className={style['post-card-container']}>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          // <article>
          <div key={node.id} className={style['post-card']}>
            <Link to={'/post' + node.fields.slug}></Link>
            <h3>{node.frontmatter.title}</h3>
            {/* <p>{node.excerpt}</p> */}
            <time dateTime={node.frontmatter.date}>
              {node.frontmatter.date}
            </time>
            {/* <figure  > */}
            {node.frontmatter.titleImage ? (
              <img
                className={style['post-card-image']}
                src={node.frontmatter.titleImage}
              />
            ) : (
              <div
                className={style['post-card-image']}
                style={{
                  backgroundColor:
                    randomBackgroundColor[Math.floor(Math.random() * 4)],
                }}
              />
            )}

            {/* </figure> */}
          </div>
          // </article>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            titleImage
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default PostList;
