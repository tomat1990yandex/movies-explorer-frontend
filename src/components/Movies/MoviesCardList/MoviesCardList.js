import { React, useState, useEffect } from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  isLoading,
  isLoadingSuccess,
  isSearchActive,
  onSave,
  onDelete,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let maxCardsQuantity;
  let increment;

  switch (true) {
    case screenWidth > 319 && screenWidth < 768:
      maxCardsQuantity = 5;
      increment = 1;
      break;
    case screenWidth > 767 && screenWidth < 1280:
      maxCardsQuantity = 8;
      increment = 2;
      break;
    case screenWidth > 1279:
      maxCardsQuantity = 16;
      increment = 4;
      break;
    default:
      maxCardsQuantity = 5;
  }

  const [cardsLimit, setCardsLimit] = useState(maxCardsQuantity);

  const showMoreCards = () => {
    setCardsLimit((prev) => prev + increment);
  };

  useEffect(() => {
    function onResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <section className="elements">
          {isLoadingSuccess ? (
            <>
              {movies.length > 0 ? (
                <>
                  <div className="elements__container">
                    {movies
                      .map((el, index) => (
                        <MoviesCard
                          key={index}
                          movie={el}
                          onSave={onSave}
                          onDelete={onDelete}
                        />
                      ))
                      .slice(0, cardsLimit)}
                  </div>
                  {cardsLimit <= movies.length && (
                    <div className="elements__pagination">
                      <button
                        onClick={showMoreCards}
                        className="elements__button"
                      >
                        Ещё
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isSearchActive && (
                    <p className="elements__caption">
                      По Вашему запросу ничего не найдено.
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <p className="elements__caption elements__caption_error">
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз.
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
