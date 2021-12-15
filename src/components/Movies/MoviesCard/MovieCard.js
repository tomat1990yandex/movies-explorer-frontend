import React, {useState} from 'react';

import './MoviesCard.css';

function MovieCard({ movieImage, isBookmarkPage }) {

  const [isInBookmark, setIsInBookmark] = useState(false);

  function handleAddBookmark() {
    setIsInBookmark(!isInBookmark);
  }

  return(
    <article className="movie-card">
      <figure className="movie-card__content">
        <img src={movieImage} className="movie-card__image" alt="33 слова о дизайне"/>
        <figcaption className="movie-card__info">
          <h3 className="movie-card__title">33 слова о дизайне</h3>
          <button className={`movie-card__button
                ${isInBookmark && "movie-card__button_type_in-bookmark"}
                ${isBookmarkPage && "movie-card__button_type_remove-bookmark"}`}
                  onClick={handleAddBookmark}>
            {isInBookmark || isBookmarkPage ? '' : ''}
          </button>
        </figcaption>
        <p className="movie-card__duration">1ч42м</p>
      </figure>
    </article>
  );
}

export default MovieCard;
