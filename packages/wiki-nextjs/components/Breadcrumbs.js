import React from 'react';
import data from './data';
import homeBlog from './homepage';
import { Breadcrumbs } from 'baseui/breadcrumbs';
import { ThemeProvider, createTheme, darkThemePrimitives } from 'baseui';

function CrumbItem(props) {
  return (
    <div
      onClick={() => props.onItemClick(props.current)}
      className="transition duration-200 ease-in-out inline text-white rounded px-1 py-0.5 text-sm cursor-pointer mx-0.5 hover:bg-blue-600 font-normal">
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

  const crumbList = path.map(current => {
    return (
      <li key={current.id} className="inline font-normal">
        <CrumbItem current={current} onItemClick={handleCrumbItemClick} />
      </li>
    );
  });

  return (
    <ThemeProvider
      theme={createTheme(darkThemePrimitives, {
        colors: { breadcrumbsSeparatorFill: 'white' },
      })}>
      <Breadcrumbs>{crumbList}</Breadcrumbs>
    </ThemeProvider>
  );
}

export default Breadcrumb;
