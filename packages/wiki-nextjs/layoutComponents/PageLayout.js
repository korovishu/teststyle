import React from 'react';
import data from '../components/data';
import ChildBlogList from './ChildBlogList';
import Banner from './Banner';
import Title from './Title';
import dummy from '../public/dummyCover.jpeg';

function Body({ children }) {
  return (
    <div>
      <p className="text-justify p-2">{children}</p>
    </div>
  );
}

function PageLayout(props) {
  const childBlogs = data.filter(blog => blog.parentId === props.id);
  return (
    <>
      <Banner src={dummy} />
      <div className="mx-auto p-4 max-w-4xl text-gray-800">
        <Title title={props.blogData.title} />
        {childBlogs.length > 0 && <ChildBlogList childBlogs={childBlogs} />}
        <Body>{props.blogData.body}</Body>
      </div>
    </>
  );
}

export default PageLayout;
