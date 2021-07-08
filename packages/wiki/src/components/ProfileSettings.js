import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';

export default class ProfileSettings extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      fullName: '',
      email: '',
      image: '',
    };

    this.setIsOpen = this.setIsOpen.bind(this);
  }

  setIsOpen(bool) {
    this.setState({
      isOpen: bool,
    });
  }

  changeFullName = event => {
    this.setState({
      fullName: event.target.value,
    });
    console.log(this.state.fullName);
  };

  changeEmail = event => {
    this.setState({
      email: event.target.value,
    });
    console.log(this.state.email);
  };

  changeImage = event => {
    this.setState({
      image: event.target.value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
  };

  render() {
    const isOpen = this.state.isOpen;
    return (
      <>
        {/* <span className = "icons"><Show /></span> */}
        <div
          className="flex cursor-pointer items-center pl-1 truncate"
          onClick={this.setIsOpen.bind(this, true)}>
          Profile & Settings
        </div>

        <Modal
          onClose={this.setIsOpen.bind(this, false)}
          isOpen={isOpen}
          animate
          autoFocus
          overrides={{
            Dialog: {
              style: {
                height: 'max-content',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              },
            },
            DialogContainer: {
              style: {
                alignItems: 'initial',
                position: 'fixed',
                marginTop: '50px',
              },
            },
            Close: {
              style: {
                display: 'none',
              },
            },
          }}>
          <ModalHeader>Profile & Settings</ModalHeader>
          <ModalBody>
            <form onSubmit={() => this.submitHandler}>
              <label className="text-black text-base">Name</label>
              <input
                className="h-9 w-full border border-solid border-gray-300 text-base rounded-lg mb-6 hover:border-blue-600 focus:outline-none"
                type="text"
                placeholder="Enter your name"
                value={this.state.fullName}
                onChange={this.changeFullName}
              />
              <label className="text-black text-base">Email</label>
              <input
                className="h-9 w-full border border-solid border-gray-300 text-base rounded-lg mb-6 hover:border-blue-600 focus:outline-none"
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.changeEmail}
              />
              <div className="float-right">
                <button
                  type="submit"
                  className="h-9 w-20 rounded-lg text-base text-white bg-blue-600 hover:bg-blue-700">
                  Update
                </button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
