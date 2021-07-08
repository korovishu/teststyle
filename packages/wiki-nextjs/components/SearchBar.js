import React from 'react';

import { Input, SIZE } from 'baseui/input';
import { IoIosSearch } from 'react-icons/io';

function SearchBar(props) {
  function handleFilterTextChange(e) {
    props.onFilterTextChange(e.target.value);
  }

  return (
    <React.Fragment>
      <Input
        value={props.filterText}
        startEnhancer={
          <span className="text-2xl text-gray-500 ">
            <IoIosSearch />
          </span>
        }
        placeholder="Search Blog..."
        onChange={handleFilterTextChange}
        clearable
        size={SIZE.large}
        overrides={{
          Root: {
            style: {
              backgroundColor: 'white',
              border: 'none',
              paddingInline: '5px',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              marginBottom: '0px',
            },
          },
          InputContainer: {
            style: () => ({ backgroundColor: 'white' }),
          },
          StartEnhancer: {
            style: () => ({ backgroundColor: 'white' }),
          },
          ClearIcon: {
            style: () => ({ color: '#757575', backgroundColor: 'white' }),
          },
        }}
      />
    </React.Fragment>
  );
}

export default SearchBar;
