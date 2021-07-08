import React, { useState, useEffect } from 'react';
import { Modal, ROLE } from 'baseui/modal';
import SearchBar from './SearchBar';
import SeachResult from './SearchResult';
import { Search } from 'baseui/icon';

function SearchModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (isOpen) setFilterText('');
  }, [isOpen]);

  return (
    <React.Fragment>
      <div
        className="flex cursor-pointer items-center py-0.5 pl-4  hover:bg-blue-600 font-normal"
        onClick={() => setIsOpen(true)}>
        <Search size={20} title="" /> &nbsp; Search Blog
      </div>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        animate
        autoFocus
        role={ROLE.dialog}
        overrides={{
          Dialog: {
            style: {
              width: '600px',
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
          Close: {
            style: {
              display: 'none',
            },
          },
        }}>
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />

        <SeachResult
          data={props.data}
          filterText={filterText}
          setIsModalOpen={setIsOpen}
          setMainBlog={props.setMainBlog}
        />
      </Modal>
    </React.Fragment>
  );
}

export default SearchModal;
