import React, {useState} from 'react';

import './Search.css';

function Search(props) {

  const [search, setSearch] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(true);

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
    setIsSearchValid(evt.target.checkValidity());
  }

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    props.onSearchSavedMovies(search);
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    props.onSearchMovies(search);
  }

  return (
    <>
      <form
        className="search"
        name="search"
        onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}
      >
        <input
          type="text"
          placeholder="Фильм"
          className="search__input"
          value={search || ''}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="search__input-button"
        />
      </form>
      <span className={`input__error ${!isSearchValid && "input__error_visible"}`}>Введите название фильма</span>
    </>
  );
}

export default Search;
