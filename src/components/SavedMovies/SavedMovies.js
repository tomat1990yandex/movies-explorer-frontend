import React, { useState, useEffect } from "react";

import "./SavedMovies.css";

import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  isLoading,
  isLoadingSuccess,
  movies,
  onSave,
  onDelete,
}) {
  const [searchMovieInput, setSearchMovieInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  function getSearchMovieInput(input) {
    setSearchMovieInput(input.toLowerCase());
    setIsSearchActive(true);
  }

  function handleCheckboxClick() {
    setIsCheckboxActive((prev) => !prev);
  }

  useEffect(() => {
    if (searchMovieInput === "") {
      return null;
    } else {
      setFilteredMovies(filterMovies(movies, searchMovieInput));
      setIsFiltered(true);
      setIsCheckboxActive(false);
    }
  }, [searchMovieInput, movies]);

  useEffect(() => {
    if (isCheckboxActive === true) {
      setFilteredMovies(filterShortMovies(movies));
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [isCheckboxActive, movies]);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onSearchClick={getSearchMovieInput} />
        <FilterCheckbox
          isChecked={isCheckboxActive}
          onClick={handleCheckboxClick}
        />
        <MoviesCardList
          movies={isFiltered ? filteredMovies : movies}
          isLoading={isLoading}
          isLoadingSuccess={isLoadingSuccess}
          isSearchActive={isSearchActive}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
}

export default SavedMovies;
