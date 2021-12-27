import {React, useEffect, useState} from "react";

import "./Movies.css";

import moviesApi from "../../utils/MoviesApi";

import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";
import checkIsMovieSaved from "../../utils/checkIsMovieSaved";

import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({myMovies, onSave, onDelete}) {
  const [searchMovieInput, setSearchMovieInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [isLocalStorageChanged, setIsLocalStorageChanged] = useState(false);

  function getSearchMovieInput(input) {
    setSearchMovieInput(input.toLowerCase());
    setIsSearchActive(true);
  }

  function handleCheckboxClick() {
    setIsCheckboxActive((prev) => !prev);
  }

  useEffect(() => {
    const storageFilms = JSON.parse(localStorage.getItem("savedMoviesSearch"));

    if (storageFilms) {
      const finalMovies = checkIsMovieSaved(storageFilms, myMovies);
      setMovies(finalMovies);
      const checkbox = JSON.parse(localStorage.getItem("isCheckboxActive"));
      setIsCheckboxActive(checkbox);
      localStorage.setItem("savedMoviesSearch", JSON.stringify(finalMovies));
      setIsLocalStorageChanged(false);
    }
  }, [myMovies, isLocalStorageChanged]);

  useEffect(() => {
    if (searchMovieInput === "") {
      return null;
    } else {
      setIsLoading(true);

      moviesApi
        .getBeatfilmMovies()
        .then((res) => {
          const filteredMovies = filterMovies(res, searchMovieInput);

          localStorage.setItem(
            "searchMovieInput",
            JSON.stringify(searchMovieInput)
          );

          localStorage.setItem(
            "savedMoviesSearch",
            JSON.stringify(filteredMovies)
          );

          setIsLoading(false);
          setMovies(filteredMovies);
          setIsLocalStorageChanged(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingSuccess(false);
        });
    }
  }, [searchMovieInput]);

  useEffect(() => {
    const storageFilms = JSON.parse(localStorage.getItem("savedMoviesSearch"));
    const filteredShortMovies = storageFilms && filterShortMovies(storageFilms);

    localStorage.setItem("isCheckboxActive", JSON.stringify(isCheckboxActive));
    const finalMovies =
      isCheckboxActive === true ? filteredShortMovies : storageFilms;

    if (storageFilms) {
      setMovies(finalMovies);
    }
  }, [isCheckboxActive]);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
          onSearchClick={getSearchMovieInput}
          searchMovieInput={searchMovieInput}
        />
        <FilterCheckbox
          isChecked={isCheckboxActive}
          onClick={handleCheckboxClick}
        />
        <MoviesCardList
          movies={movies}
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

export default Movies;
