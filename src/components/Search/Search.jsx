import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSearch}
      style={{ width: '100%' }}
    >
      <div>
        <TextField
          sx={{ width: '100%' }}
          id="searchBox"
          label="Поиск"
          type="search"
          size="small"
          variant="outlined"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func
};

export default Search;
