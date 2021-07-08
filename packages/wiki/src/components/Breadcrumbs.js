import React from 'react';
import data from '../data';
import homeBlog from '../homepage';

function CrumbItem(props) {
  return (
    <div
      onClick={() => props.onItemClick(props.current)}
      className="inline rounded-md p-1 cursor-pointer mx-0.5 hover:bg-blue-600">
      {props.current.blogData.title}
    </div>
  );
}

function Breadcrumb(props) {
  function findPath(id, path) {
    if (id === '0') return;
    for (let blog of data) {
      if (blog.id === id) {
        path.unshift(blog);
        return findPath(blog.parentId, path);
      }
    }
  }

  const path = [];
  findPath(props.id, path);
  path.unshift(homeBlog);

  function handleCrumbItemClick(blog) {
    props.setMainBlog(blog);
  }

  const crumbList = path.map((current, index) => {
    return (
      <li key={current.id} className="inline">
        <CrumbItem current={current} onItemClick={handleCrumbItemClick} />
        {index !== path.length - 1 && <span>❯</span>}
      </li>
    );
  });

  return <ul className="flex-row text-sm ">{crumbList}</ul>;
}

export default Breadcrumb;
