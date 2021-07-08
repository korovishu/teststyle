import { PureComponent } from 'react';
import data from './data';
import NavBlogTopic from './NavBlogTopic';
import DropDownList from './DropDownList';
import CreateTopic from './CreateTopic';
import { Button, SIZE } from 'baseui/button';
import blog from './homepage';
import ProfileSettings from './ProfileSettings';
import AdminSettings from './AdminSettings';
import SearchModal from './SearchModal';
import Menu from 'baseui/icon/menu';
import Plus from 'baseui/icon/plus';
import Overflow from 'baseui/icon/overflow';
import TriangleDown from 'baseui/icon/triangle-down';
import TriangleRight from 'baseui/icon/triangle-right';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import MyBlogs from './MyBlogs';

class NavBlogList extends PureComponent {
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
    this.dropDownFlag = this.dropDownFlag.bind(this);
    this.isHoverOnDiv = this.isHoverOnDiv.bind(this);
    this.sideMenuButtonChange = this.sideMenuButtonChange.bind(this);
  }
  setMain(blogData) {
    this.props.setMainBlog(blogData);
  }
  toggleActive(index) {
    let newtopics = this.state.topics;
    newtopics[index].active ^= true;
    this.setState({ topics: newtopics });
    this.forceUpdate();
  }
  dropDownFlag(index) {
    this.setState(
      {
        dropDown: index,
      },
      () => {
        console.log(this.state.dropDown);
      },
    );
  }
  isHoverOnDiv(index) {
    this.setState({
      isHover: index,
    });
  }
  sideMenuButtonChange() {
    this.setState({
      sideMenuButton: !this.state.sideMenuButton,
    });
  }

  render() {
    return (
      <div className="flex flex-col h-screen w-64 text-white bg-opacity-70 border-r text-base flex-shrink-0 truncate font-sans font-medium bg-blue-700">
        <div className="flex flex-none pl-4 sticky top-0 justify-between py-0.5 hover:bg-blue-600">
          <ProfileSettings />
          <ThemeProvider
            theme={createTheme(lightThemePrimitives, {
              colors: {
                buttonPrimaryHover: '#1D4ED8',
                buttonPrimaryActive: '#1D4ED8',
              },
            })}>
            <Button
              size={SIZE.compact}
              onClick={this.props.toggleNav}
              overrides={{
                BaseButton: {
                  style: () => ({
                    borderRadius: '4px',
                    padding: '4px',
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    margin: '5px',
                  }),
                },
              }}>
              <Menu size={24} title="" />
            </Button>
          </ThemeProvider>
        </div>
        <hr
          style={{
            width: '90%',
            marginLeft: '5%',
            opacity: '0',
            marginBottom: '10px',
          }}
        />
        <div className="pl-4 justify-between py-0.5 hover:bg-blue-600">
          <AdminSettings />
        </div>
        <div className="pl-4 justify-between py-0.5 hover:bg-blue-600">
          <MyBlogs />
        </div>
        <SearchModal setMainBlog={this.props.setMainBlog} />
        <hr
          style={{
            width: '90%',
            marginLeft: '5%',
            opacity: '0',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        />

        <div
          className="pl-5 py-1 flex-none cursor-pointer truncate hover:bg-blue-600 font-normal"
          onClick={() => this.props.setMainBlog(blog)}>
          ENGINEERING WIKI
        </div>

        <div className="flex-grow overflow-y-auto">
          {this.state.topics.map((topic, i) => {
            return (
              <div key={i}>
                <div
                  className="flex py-1 pl-4 hover:bg-blue-600"
                  onMouseEnter={() => this.isHoverOnDiv(i)}
                  onMouseLeave={() => {
                    this.isHoverOnDiv(-1);
                    this.dropDownFlag(-1);
                  }}>
                  <ThemeProvider
                    theme={createTheme(lightThemePrimitives, {
                      colors: {
                        buttonPrimaryHover: '#1D4ED8',
                        buttonPrimaryActive: '#1D4ED8',
                      },
                    })}>
                    <Button
                      size={SIZE.compact}
                      onClick={() => this.toggleActive(i)}
                      overrides={{
                        BaseButton: {
                          style: () => ({
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            padding: '1px',
                            alignSelf: 'center',
                          }),
                        },
                      }}>
                      {topic.active ? (
                        <TriangleDown size={20} title="" />
                      ) : (
                        <TriangleRight size={20} title="" />
                      )}
                    </Button>
                  </ThemeProvider>
                  <div
                    className="cursor-pointer pl-0.5 truncate font-normal"
                    onClick={() => {
                      this.props.setMainBlog(topic);
                    }}>
                    {topic.blogData.title}
                  </div>
                  {this.state.isHover === i && (
                    <>
                      <div className="flex ml-auto text-center">
                        <ThemeProvider
                          theme={createTheme(lightThemePrimitives, {
                            colors: {
                              buttonPrimaryHover: '#1D4ED8',
                              buttonPrimaryActive: '#1D4ED8',
                            },
                          })}>
                          <Button
                            size={SIZE.compact}
                            onClick={() => this.dropDownFlag(i)}
                            overrides={{
                              BaseButton: {
                                style: () => ({
                                  borderRadius: '4px',
                                  backgroundColor: 'transparent',
                                  padding: '3px',
                                  alignSelf: 'center',
                                }),
                              },
                            }}>
                            <Overflow title="" />
                          </Button>
                        </ThemeProvider>
                        {/* dropDown variable is used for to know whether 
                        button is click so to show drop down menu. */}
                        {this.state.dropDown === i && (
                          <DropDownList dropDownFlag={this.dropDownFlag} />
                        )}
                      </div>
                      {/* <button className="text-center inline rounded-md ml-px mr-1 my-auto pl-1 pr-1 hover:bg-blue-700">
                        <Plus />
                      </button> */}
                      <ThemeProvider
                        theme={createTheme(lightThemePrimitives, {
                          colors: {
                            buttonPrimaryHover: '#1D4ED8',
                            buttonPrimaryActive: '#1D4ED8',
                          },
                        })}>
                        <Button
                          size={SIZE.compact}
                          overrides={{
                            BaseButton: {
                              style: () => ({
                                borderRadius: '4px',
                                padding: '3px',
                                backgroundColor: 'transparent',
                                alignSelf: 'center',
                                margin: '0 5px 0 3px',
                              }),
                            },
                          }}>
                          <Plus title="" />
                        </Button>
                      </ThemeProvider>
                    </>
                  )}
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
        <div
          id="addPage"
          className="flex flex-none border-t border-opacity-20 cursor-pointer h-12 sticky bottom-0 pl-1 hover:bg-blue-600">
          <CreateTopic />
        </div>
      </div>
    );
  }
}

export default NavBlogList;
