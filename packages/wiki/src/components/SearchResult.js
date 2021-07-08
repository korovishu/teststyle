import React from 'react';
import { ListItemLabel } from 'baseui/list';
import { Alert } from 'baseui/icon';
import data from '../data';

function ResultBlog(props) {
  let blog = props.blog;
  let parent = blog.parentId;
  let path = '';
  for (let blogItem of data) {
    if (blogItem.id === parent) {
      path = `${blogItem.blogData.title} ❯ ${blog.blogData.title}`;
      break;
    }
  }
  function handleBlogResultClick() {
    props.setIsModalOpen(false);
    props.setMainBlog(blog);
  }
  return (
    <div onClick={handleBlogResultClick} className="search-result-list-item">
      <ListItemLabel description={path}>
        {props.blog.blogData.title}
      </ListItemLabel>
    </div>
  );
}

function SearchResult(props) {
  let filterText = props.filterText;
  if (filterText === '') return '';
  const ResultList = [];

  data.forEach(blog => {
    let title = blog.blogData.title.toLowerCase();
    if (title.indexOf(filterText.toLowerCase()) > -1) {
      let listItem = (
        <ResultBlog
          key={blog.id}
          blog={blog}
          setIsModalOpen={props.setIsModalOpen}
          setMainBlog={props.setMainBlog}
        />
      );
      ResultList.push(listItem);
    }
  });

  return (
    <ul className="search-result-list">
      {ResultList.length === 0 ? (
        <div className="flex p-2 text-lg items-center">
          <Alert size={28} color="gray" /> Sorry, No Blog Found for '
          {filterText}'
        </div>
      ) : (
        ResultList
      )}
    </ul>
  );
}

export default SearchResult;
