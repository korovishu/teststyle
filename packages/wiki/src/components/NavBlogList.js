import { Component } from 'react';
import data from '../data';
import NavBlogTopic from './NavBlogTopic';
import blog from '../homepage';
import { withRouter } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import SearchModal from './SearchModal';
import TriangleRight from 'baseui/icon/triangle-right';
import TriangleDown from 'baseui/icon/triangle-down';
import Menu from 'baseui/icon/menu';

class NavBlogList extends Component {
  constructor() {
    super();

    let topics = [];
    let topicMap = {};
    data
      .filter(item => item.type === 'topic')
      .forEach(item => {
        let topic = {
          id: item.id,
          blogData: item.blogData,
          parentTitle: '',
          children: [],
          active: false,
        };
        topicMap[item.id] = topics.length;
        topics.push(topic);
      });
    data
      .filter(item => item.type === 'blog')
      .forEach(item => {
        let blog = {
          id: item.id,
          parentTitle: item.parentTitle,
          parentId: item.parentId,
          blogData: item.blogData,
        };
        topics[topicMap[item.parentId]].children.push(blog);
      });

    this.state = {
      topics: topics,
    };

    this.setMain = this.setMain.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }
  setMain(blogData) {
    this.props.setMainBlog(blogData);
  }
  toggleActive(index) {
    this.state.topics[index].active ^= true;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="h-screen w-64 bg-blue-600 text-white bg-opacity-70 border-r-2 text-base flex-shrink-0 truncate">
        <div className="flex pl-4  justify-between py-0.5 hover:bg-blue-600">
          <ProfileSettings />
          <button
            className="inline rounded-md m-1 hover:bg-blue-700"
            onClick={this.props.toggleNav}>
            <Menu size={28} />
          </button>
        </div>
        <SearchModal setMainBlog={this.props.setMainBlog} />
        <div
          className="mt-10 pl-5 py-0.5 cursor-pointer truncate hover:bg-blue-600"
          onClick={() => this.props.setMainBlog(blog)}>
          Engineering Wiki
        </div>
        {this.state.topics.map((topic, i) => {
          return (
            <div key={i}>
              <div className="flex py-0.5 pl-4 hover:bg-blue-600">
                <button
                  className="text-center rounded-md my-auto hover:bg-blue-700"
                  onClick={e => this.toggleActive(i)}>
                  {topic.active ? (
                    <TriangleDown size={22} />
                  ) : (
                    <TriangleRight size={22} />
                  )}
                </button>
                <div
                  className="cursor-pointer truncate"
                  onClick={() => {
                    this.props.setMainBlog(topic);
                  }}>
                  {topic.blogData.title}
                </div>
              </div>
              <div className={topic.active ? 'show' : 'hidden'}>
                <NavBlogTopic
                  blogs={topic.children}
                  setMainBlog={this.props.setMainBlog}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(NavBlogList);
