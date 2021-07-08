import { Component } from 'react';
import CheckIndeterminate from 'baseui/icon/check-indeterminate';

export default class NavBlogTopic extends Component {
  constructor() {
    super();
    this.setMain = this.setMain.bind(this);
  }
  setMain(blogData) {
    this.props.setMainBlog(blogData);
  }
  render() {
    return (
      <div>
        {this.props.blogs.map((blog, i) => {
          return (
            <div
              key={i}
              className="pl-7 cursor-pointer truncate hover:bg-blue-600"
              onClick={() => this.setMain(blog)}>
              <CheckIndeterminate size={18} /> {blog.blogData.title}
            </div>
          );
        })}
      </div>
    );
  }
}
