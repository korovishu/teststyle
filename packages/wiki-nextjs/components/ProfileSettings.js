import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { Button, SIZE } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { ThemeProvider, createTheme, lightThemePrimitives } from 'baseui';

function ProfileSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  const cancelSubmit = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      {/* <span className = "icons"><Show /></span> */}
      <div
        className="flex cursor-pointer items-center pl-1 truncate font-normal"
        onClick={() => setIsOpen(true)}>
        Profile & Settings
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
        <ModalHeader>Profile & Settings</ModalHeader>
        <ModalBody>
          <form>
            <FormControl label="Name">
              <Input
                id="name"
                placeholder="Enter your full name..."
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                overrides={{
                  Root: {
                    style: () => ({
                      border: '1px solid',
                      borderRadius: '2px',
                    }),
                  },
                }}
              />
            </FormControl>
            <FormControl label="Your email">
              <Input
                id="emailID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="abc@xyz.com"
                overrides={{
                  Root: {
                    style: () => ({
                      border: '1px solid',
                      borderRadius: '2px',
                    }),
                  },
                }}
              />
            </FormControl>
            <FormControl label="Profile Picture">
              <input
                id=""
                value={image}
                onChange={e => setImage(e.target.value)}
                type="file"
              />
            </FormControl>
            <div className="float-right">
              <Button
                size={SIZE.compact}
                onClick={cancelSubmit}
                overrides={{
                  BaseButton: {
                    style: () => ({
                      marginInlineEnd: '10px',
                      borderRadius: '4px',
                      backgroundColor: '#ccc',
                    }),
                  },
                }}>
                Cancel
              </Button>
              <ThemeProvider
                theme={createTheme(lightThemePrimitives, {
                  colors: {
                    buttonPrimaryHover: '#2563EB',
                    buttonPrimaryActive: '#2563EB',
                  },
                })}>
                <Button
                  size={SIZE.compact}
                  onClick={submitHandler}
                  overrides={{
                    BaseButton: {
                      style: () => ({
                        borderRadius: '4px',
                        backgroundColor: '#3B82F6',
                      }),
                    },
                  }}>
                  Update
                </Button>
              </ThemeProvider>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProfileSettings;
