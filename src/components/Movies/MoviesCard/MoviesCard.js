import React from "react";

import { useLocation } from "react-router-dom";

import iconDelete from "../../../images/close-icon.svg";

import "./MoviesCard.css";

function MoviesCard({ movie, onSave, onDelete }) {
  const {
    nameRU,
    duration,
    image,
    trailerLink,
    trailer,
    isSaved = false,
  } = movie;
  const finalTrailerLink = trailerLink ? trailerLink : trailer;

  const location = useLocation();

  const movieImage =
    location.pathname === "/saved-movies"
      ? image
      : `https://api.nomoreparties.co${image.url}`;

  const hours = duration && Math.floor(duration / 60);
  const minutes = duration && duration - hours * 60;

  const saveIconClassName = isSaved
    ? "article__icon-block article__icon-block_active"
    : "article__icon-block";

  function handleClick(e) {
    const movieName = e.target
      .closest(".article")
      .querySelector(".article__title").textContent;

    if (location.pathname === "/movies" && isSaved === true) {
      onDelete(movieName);
    } else if (location.pathname === "/movies" && isSaved === false) {
      onSave(movieName);
    } else {
      onDelete(movieName);
    }
  }

  return (
    <div className="article">
      <a href={finalTrailerLink} target="_blank" rel="noreferrer">
        <img
          src={movieImage}
          alt="Картинка карточки"
          className="article__image"
        />
      </a>
      <div className="article__header">
        <div className="article__description">
          <h3 className="article__title">{nameRU}</h3>
          <p className="article__subtitle">
            {hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}
          </p>
        </div>
        <div className={saveIconClassName} onClick={handleClick}>
          {location.pathname === "/saved-movies" ? (
            <img
              src={iconDelete}
              alt="Иконка удаления"
              className="article__icon"
            />
          ) : (
            <div
              className={isSaved ? "article__icon-block_active" : "article__icon"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
