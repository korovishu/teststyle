import React, { useEffect, useState } from 'react';
import PageLayout from '../layoutComponents/PageLayout';
import NavBlogList from '../components/NavBlogList';
import defaultblog from '../components/homepage';
import Breadcrumb from '../components/Breadcrumbs';
import ManageTopic from '../components/ManageTopic';
import Menu from 'baseui/icon/menu';
import data from '../components/data';
import Router from 'next/router';
import { Button, SIZE } from 'baseui/button';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';
import { useAuth } from '../lib/auth';

function App({ bid }) {
  const auth = useAuth();
  const [blog, setCurrentBlog] = useState(defaultblog.blogData);
  const [id, setId] = useState('0');
  const [shownav, setShownav] = useState(true);

  useEffect(() => {
    let newBlog = defaultblog;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == bid) {
        newBlog = data[i];
      }
    }
    setCurrentBlog(newBlog.blogData);
    setId(newBlog.id);
  }, [bid]);

  function setMainBlog(sblog) {
    Router.push(sblog.id);
    console.log(sblog);
  }

  function toggleNav() {
    setShownav(!shownav);
  }
  if (auth.loading) return null;
  return (
    <div className="flex flex-row">
      <div
        style={
          shownav
            ? { left: 0, transitionDuration: '1s' }
            : { position: 'fixed', left: '-100%', transitionDuration: '0.3s' }
        }>
        <NavBlogList setMainBlog={setMainBlog} toggleNav={toggleNav} />
      </div>
      <div className="flex flex-col flex-grow flex-shrink max-h-screen overflow-y-auto">
        <div
          id="Header"
          className="flex flex-none sticky top-0 bg-blue-700 text-white bg-opacity-70 border-b h-12 items-center px-2">
          {!shownav && (
            <ThemeProvider
              theme={createTheme(lightThemePrimitives, {
                colors: {
                  buttonPrimaryHover: '#2563EB',
                  buttonPrimaryActive: '#2563EB',
                },
              })}>
              <Button
                size={SIZE.compact}
                onClick={toggleNav}
                overrides={{
                  BaseButton: {
                    style: () => ({
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      padding: '4px',
                      alignSelf: 'center',
                    }),
                  },
                }}>
                <Menu size={20} title="" />
              </Button>
            </ThemeProvider>
          )}
          <Breadcrumb id={id} setMainBlog={setMainBlog} />
          <ManageTopic />
        </div>
        <div className="flex-grow overflow-y-auto">
          <PageLayout blogData={blog} id={id} />
        </div>
      </div>
    </div>
  );
}

export default App;
