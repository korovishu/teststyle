import React from 'react';
import { Modal, ROLE } from 'baseui/modal';
import SearchBar from './SearchBar';
import SeachResult from './SearchResult';
import { Search } from 'baseui/icon';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      filterText: '',
    };
    this.setIsOpen = this.setIsOpen.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  setIsOpen(bool) {
    let newState = { isOpen: bool };
    if (bool) newState['filterText'] = '';
    this.setState(newState);
  }

  handleFilterTextChange(value) {
    this.setState({
      filterText: value,
    });
  }

  render() {
    const isOpen = this.state.isOpen;
    const filterText = this.state.filterText;
    return (
      <React.Fragment>
        <div
          className="flex cursor-pointer items-center py-0.5 pl-4  hover:bg-blue-600"
          onClick={this.setIsOpen.bind(this, true)}>
          <Search size={20} /> Search Blog
        </div>
        <Modal
          onClose={this.setIsOpen.bind(this, false)}
          isOpen={isOpen}
          animate
          autoFocus
          role={ROLE.dialog}
          overrides={{
            Dialog: {
              style: {
                width: '600px',
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
          <SearchBar
            filterText={filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />

          <SeachResult
            data={this.props.data}
            filterText={filterText}
            setIsModalOpen={this.setIsOpen}
            setMainBlog={this.props.setMainBlog}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default SearchModal;
