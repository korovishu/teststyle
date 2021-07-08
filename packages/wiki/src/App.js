import './App.css';
import { Component } from 'react';
import TestMain from './components/TestMain';
import NavBlogList from './components/NavBlogList';
import blog from './homepage';
import { withRouter } from 'react-router-dom';
import Breadcrumb from './components/Breadcrumbs';
import Menu from 'baseui/icon/menu';

class App extends Component {
  constructor() {
    super();
    this.state = {
      blog: blog.blogData,
      id: '0',
      shownav: true,
    };
    this.setMainBlog = this.setMainBlog.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }
  setMainBlog(blog) {
    this.setState({
      blog: blog.blogData,
      id: blog.id,
    });
  }

  toggleNav() {
    console.log(this.state.shownav);
    this.setState({ shownav: !this.state.shownav });
  }

  render() {
    return (
      <div className="flex flex-row">
        {this.state.shownav && (
          <NavBlogList
            setMainBlog={this.setMainBlog}
            toggleNav={this.toggleNav}
          />
        )}
        <div className="flex-column flex-grow flex-shrink max-h-screen overflow-y-scroll">
          <div
            id="Header"
            className="sticky top-0 flex bg-blue-600 text-white bg-opacity-70 border-b-2 h-12 items-center px-2">
            {!this.state.shownav && (
              <button
                className="rounded-md m-1 hover:bg-blue-600"
                onClick={this.toggleNav}>
                <Menu size={24} />
              </button>
            )}
            <Breadcrumb id={this.state.id} setMainBlog={this.setMainBlog} />
          </div>
          <div className="flex-grow flex-shrink">
            <TestMain blogData={this.state.blog} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
