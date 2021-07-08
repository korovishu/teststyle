import React from 'react';
import Link from 'next/link';

function ChildBlogList({ childBlogs }) {
  return (
    <div className="grid gap-1 grid-cols-1 md:grid-cols-2 border-t border-b py-1">
      {childBlogs.map(blog => {
        return (
          <Link key={blog.id} href={'/' + blog.id}>
            <div className="cursor-pointer text-gray-700 p-1 rounded truncate underline hover:bg-gray-100 mx-2">
              {blog.blogData.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ChildBlogList;
