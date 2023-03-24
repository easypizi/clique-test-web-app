import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import './Search.css';

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(searchText);
  };

  return (
    <form
      className="search"
      noValidate
      autoComplete="off"
      onSubmit={handleSearch}
    >
      <div>
        <TextField
          className="inputSearch"
          id="outlined-search"
          label="Type Name"
          type="search"
          variant="outlined"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};

export default Search;