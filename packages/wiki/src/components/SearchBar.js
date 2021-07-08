import React from 'react';

import { Input, SIZE } from 'baseui/input';
import { Search } from 'baseui/icon';

function SearchBar(props) {
  function handleFilterTextChange(e) {
    props.onFilterTextChange(e.target.value);
  }

  return (
    <React.Fragment>
      <Input
        value={props.filterText}
        startEnhancer={<Search size="28px" />}
        placeholder="Search Blog..."
        onChange={handleFilterTextChange}
        clearable
        size={SIZE.large}
        overrides={{
          Root: {
            style: {
              border: 'none',
              borderRadius: '10px',
              marginBottom: '0px',
            },
          },
        }}
      />
    </React.Fragment>
  );
}

export default SearchBar;
