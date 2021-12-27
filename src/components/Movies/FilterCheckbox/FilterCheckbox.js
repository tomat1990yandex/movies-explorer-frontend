import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, onClick }) {
  return (
    <div className="movies__filter">
      <input
        name="movie-filter"
        type="checkbox"
        className="movie__filter-input"
        checked={isChecked}
        onChange={onClick}
      />
      <label className="movie__filter-label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
