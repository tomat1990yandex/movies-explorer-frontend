export default function checkIsMovieSaved(movies, myMovies) {
  return movies.map((el) => {
    let isSaved;

    if (myMovies.find((item) => item.nameRU === el.nameRU)) {
      isSaved = true;
    } else {
      isSaved = false;
    }

    el.isSaved = isSaved;

    return el;
  });
}
