import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { Button } from 'baseui/button';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Tabs, Tab } from 'baseui/tabs';
import Show from 'baseui/icon/show';
import Router from 'next/router';

function MyBlogs() {
  const [isOpen, setIsOpen] = useState(false);
  const [memberBlogs, setMemberBlogs] = useState(MemberBlogs());
  const [managerBlogs, setManagerBlogs] = useState(ManagerBlogs());
  const [activeKey, setActiveKey] = React.useState('0');
  const [css] = useStyletron();

  function setBlog(blog) {
    Router.push(blog.id);
    setMemberBlogs(memberBlogs);
    setManagerBlogs(managerBlogs);
    setIsOpen(false);
  }

  return (
    <>
      {/* <span className = "icons"><Show /></span> */}
      <div
        className="flex cursor-pointer items-center pl-1 truncate font-normal"
        onClick={() => setIsOpen(true)}>
        <Show />
        {/* <GrUserManager style={{color: "white", borderColor: "white", stroke:"white"}}/>  */}
        &nbsp; My Blogs
      </div>

      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        animate
        autoFocus
        overrides={{
          Dialog: {
            style: {
              height: 'max-content',
              width: '40%',
              minWidth: '500px',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
            },
          },
          DialogContainer: {
            style: {
              alignItems: 'initial',
              position: 'fixed',
              marginTop: '7vh',
            },
          },
        }}>
        <ModalHeader>My Blogs</ModalHeader>
        <ModalBody>
          <Tabs
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
            activeKey={activeKey}
            overrides={{
              TabBar: {
                style: () => ({
                  outline: '#fff solid',
                  backgroundColor: '#fff',
                }),
              },
            }}>
            <Tab title="Manager">
              <div className="flex">
                <div></div>
                <ul
                  style={{ flex: 1 }}
                  className={css({
                    width: '60%',
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowY: 'auto',
                    maxHeight: '60vh',
                    marginRight: 0,
                  })}>
                  {memberBlogs.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemLabel>{item.title}</ListItemLabel>
                      <Button kind="secondary" onClick={() => setBlog(item)}>
                        View
                      </Button>
                    </ListItem>
                  ))}
                </ul>
              </div>
            </Tab>
            <Tab title="Member">
              <div className="flex">
                <ul
                  style={{ flex: 1 }}
                  className={css({
                    width: '60%',
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowY: 'auto',
                    maxHeight: '60vh',
                    marginRight: 0,
                  })}>
                  {managerBlogs.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemLabel>{item.title}</ListItemLabel>
                      <Button kind="secondary" onClick={() => setBlog(item)}>
                        View
                      </Button>
                    </ListItem>
                  ))}
                </ul>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </Modal>
    </>
  );
}

function ManagerBlogs() {
  return [
    {
      id: '8',
      title: 'French Fries',
    },
  ];
}

function MemberBlogs() {
  return [
    {
      id: '1',
      title: 'React',
    },
    {
      id: '4',
      title: 'Angular',
    },
  ];
}

export default MyBlogs;
