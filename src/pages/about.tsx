import React from 'react';
import Layout from '../components/layout';
import style from '../styles/about.module.less';

const About = () => {
  return (
    <Layout>
      <div className={style['post-container']}>
        <h1>About Me</h1>
        <p>全菜工程师, 追求极致</p>
        <p>现主要技术栈: JavaScript/Typescript, React, C++, Webpack, Git</p>
        {/* <p>会用: Linux, Pug, Stylus</p> */}
        <h2 id='关于我'>关于我</h2>
        <p>
          本科 |{' '}
          <a href='http://www.xupt.edu.cn/' target='_blank' rel='noopener'>
            西安邮电大学(XUPT)
          </a>{' '}
          | 电子信息工程 | 2014.9–2018.7
        </p>
        <p>
          硕士(在读) |{' '}
          <a href='https://www.xidian.edu.cn' target='_blank' rel='noopener'>
            西安电子科技大学(XDU)
          </a>{' '}
          | 软件工程 | 2018.9–
        </p>
        <h2 id='联系方式'>
          <a href='#联系方式' className='headerlink' title='联系方式'></a>找到我
        </h2>
        <p>
          E-Mail:{' '}
          <a href='mailto:lixuetaoleo@163.com' target='_blank' rel='noopener'>
            lixuetaoleo@163.com
          </a>{' '}
          ||{' '}
          <a href='mailto:lixuetaoleo@gmail.com' target='_blank' rel='noopener'>
            lixuetaoleo@gmail.com
          </a>
        </p>
        <p>
          Github:{' '}
          <a href='https://github.com/lixuetaoleo' target='_blank' rel='noopener'>
            lixuetaoleo
          </a>{' '}
        </p>
        {/* <p>Switch神秘代码: SW-6111-0949-8603</p> */}
      </div>
    </Layout>
  );
};

export default About;
