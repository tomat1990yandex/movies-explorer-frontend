import React from 'react';

import './MoviesCardList.css';
import MovieCard from "../MoviesCard/MovieCard";

import image_1 from '../../../images/movies-thumbnails/33 words about design.png';
import image_2 from '../../../images/movies-thumbnails/33 words about design-2.png';
import image_3 from '../../../images/movies-thumbnails/33 words about design-3.png';
import image_4 from '../../../images/movies-thumbnails/33 words about design-4.png';
import image_5 from '../../../images/movies-thumbnails/33 words about design-5.png';
import image_6 from '../../../images/movies-thumbnails/33 words about design-6.png';
import image_7 from '../../../images/movies-thumbnails/33 words about design-7.png';
import image_8 from '../../../images/movies-thumbnails/33 words about design-8.png';
import image_9 from '../../../images/movies-thumbnails/33 words about design-9.png';
import image_10 from '../../../images/movies-thumbnails/33 words about design-10.png';
import image_11 from '../../../images/movies-thumbnails/33 words about design-11.png';
import image_12 from '../../../images/movies-thumbnails/33 words about design-12.png';
import image_13 from '../../../images/movies-thumbnails/33 words about design-13.png';
import image_14 from '../../../images/movies-thumbnails/33 words about design-14.png';
import image_15 from '../../../images/movies-thumbnails/33 words about design-15.png';
import image_16 from '../../../images/movies-thumbnails/33 words about design-16.png';


function MoviesCardList({ isBookmarkPage }) {
  return(
    <section className="movies-card-list">
      <div className="movies-card-list__movies-wrapper">
        <MovieCard
          movieImage={image_1}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_2}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_3}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_4}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_5}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_6}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_7}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_8}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_9}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_10}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_11}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_12}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_13}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_14}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_15}
          isBookmarkPage={isBookmarkPage}
        />
        <MovieCard
          movieImage={image_16}
          isBookmarkPage={isBookmarkPage}
        />
      </div>
      {
        isBookmarkPage ?
          (
            <div className="saved-movies__footer-gap" />
          ) : (
            <button className="movies-card-list__lazy-load-button">Ещё</button>
          )
      }
    </section>
  );
}

export default MoviesCardList;
