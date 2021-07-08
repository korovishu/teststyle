import React from 'react';
import { ListItemLabel } from 'baseui/list';
import { Alert } from 'baseui/icon';
import { IoIosReturnLeft } from 'react-icons/io';
import data from './data';

function ResultBlog(props) {
  let blog = props.blog;
  let parent = blog.parentId;
  let path = '';
  for (let blogItem of data) {
    if (blogItem.id === parent) {
      path = `${blogItem.blogData.title} › ${blog.blogData.title}`;
      break;
    }
  }
  function handleBlogResultClick() {
    props.setIsModalOpen(false);
    props.setMainBlog(blog);
  }
  return (
    <div
      onClick={handleBlogResultClick}
      className="search-result-item flex flex-row group justify-between py-2 px-3.5 cursor-pointer border-t border-opacity-70 hover:bg-gray-100">
      <div className="overflow-ellipsis overflow-hidden">
        <ListItemLabel
          description={path}
          overrides={{
            LabelContent: {
              style: () => ({ color: '#636362', fontSize: '15px' }),
            },
            LabelDescription: {
              style: () => ({ color: '#878686', fontSize: '13px' }),
            },
          }}>
          {props.blog.blogData.title}
        </ListItemLabel>
      </div>
      <span className="my-auto text-gray-400 px-2 text-lg opacity-0 group-hover:opacity-100">
        <IoIosReturnLeft />
      </span>
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

  if (ResultList.length === 0) {
    return (
      <div className="flex justify-center text-sm items-center border-t border-gray-300 p-2 text-gray-700 px-auto py-8">
        <Alert size={28} color="gray" /> Sorry, No Blog Found for &quot;
        {filterText}&quot;
      </div>
    );
  }

  return (
    <div className="flex-col border-t border-gray-300">
      <ul
        className="flex-col overflow-x-hidden overflow-y-auto"
        style={{ maxHeight: '75vh' }}>
        {ResultList}
      </ul>
      <div className="rounded-b border-t sticky bottom-0 bg-white opacity-100 text-gray-500 pl-3.5 py-1 border-gray-200 text-sm">
        {ResultList.length === 1 && <span>1 result</span>}
        {ResultList.length > 1 && <span>{ResultList.length} results</span>}
        {console.log(ResultList.length)}
      </div>
    </div>
  );
}

export default SearchResult;
