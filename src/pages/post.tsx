import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import style from '../styles/post.module.less';

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
                <img className={style['post-card-image']} src={'https://static1.squarespace.com/static/59b7aab7f43b558af35c8023/59b7c063eaa5a41f829e5563/5b53fa430e2e72a170b3cfb9/1532232046694/20180722-DSC_7285.jpg'}></img>
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
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
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
