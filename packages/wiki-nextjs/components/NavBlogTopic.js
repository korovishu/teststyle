import React, { useState } from 'react';
import DropDownList from './DropDownList';
// import CheckIndeterminate from 'baseui/icon/check-indeterminate';
import { Button, SIZE } from 'baseui/button';
import Overflow from 'baseui/icon/overflow';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { BsDot } from 'react-icons/bs';
export default function NavBlogTopic({ setMainBlog, blogs }) {
  const [dropDown, setDropDown] = useState(-1);
  const [isHover, setIsHover] = useState(false);

  function setMain(blogData) {
    setMainBlog(blogData);
  }

  function dropDownFlag(index) {
    setDropDown(index);
  }

  function isHoverOnDiv(index) {
    setIsHover(index);
  }

  return (
    <div>
      {blogs.map((blog, i) => {
        return (
          <div
            key={i}
            className="flex pl-6 p-1 cursor-pointer truncate hover:bg-blue-600"
            onMouseEnter={() => isHoverOnDiv(i)}
            onMouseLeave={() => {
              isHoverOnDiv(-1);
              dropDownFlag(-1);
            }}>
            <span className="text-center p-1 mx-1">
              <BsDot />
            </span>{' '}
            <div
              className="text-center mr-auto cursor-pointer truncate font-normal"
              onClick={() => setMain(blog)}>
              {blog.blogData.title}
            </div>
            {isHover === i && (
              <div className="flex ml-auto inline-block">
                <ThemeProvider
                  theme={createTheme(lightThemePrimitives, {
                    colors: {
                      buttonPrimaryHover: '#1D4ED8',
                      buttonPrimaryActive: '#1D4ED8',
                    },
                  })}>
                  <Button
                    size={SIZE.compact}
                    onClick={() => dropDownFlag(i)}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          borderRadius: '4px',
                          backgroundColor: 'transparent',
                          padding: '2px',
                          alignSelf: 'center',
                        }),
                      },
                    }}>
                    <Overflow title="" />
                  </Button>
                </ThemeProvider>
                {dropDown === i && (
                  <DropDownList blog={blog} dropDownFlag={dropDownFlag} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
