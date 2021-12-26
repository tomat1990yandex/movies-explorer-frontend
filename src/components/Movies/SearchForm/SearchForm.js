import React from "react";

import "./SearchForm.css";

import useFormAndValidation from "../../../utils/useFormAndValidation";
import find from "../../../images/find-button.svg";

function SearchForm({onSearchClick}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleCustomizedError,
    resetForm,
  } = useFormAndValidation();

  const movieSearchInputName = "movieSearch";
  const movieSearchMessage = "Нужно ввести ключевое слово";

  function handleSubmit(e) {
    e.preventDefault();

    if (!values[movieSearchInputName]) {
      handleCustomizedError(movieSearchInputName, movieSearchMessage);
    } else {
      onSearchClick(values[movieSearchInputName]);
      resetForm();
    }
  }

  return (
    <form
      noValidate
      name="movieSearchForm"
      className="movie__search-form"
      onSubmit={handleSubmit}
    >
      <input
        name="movieSearch"
        type="text"
        placeholder="Фильм"
        className={`movie__search-input ${
          errors.movieSearch && "movie__search-input_error"
        }`}
        // value={values.movieSearch || ""}
        onChange={handleChange}
        autoComplete="off"
      />
      <button type="submit" className="movie__search-button">
        <img src={find} alt="кнопка поиска" className="movie__search-button_find" />
      </button>
      <span
        className={`movie__search-span ${
          isValid === false && "movie__search-span_visible"
        }`}
      >
        {errors.movieSearch}
      </span>
    </form>
  );
}

export default SearchForm;
