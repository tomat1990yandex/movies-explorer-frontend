import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {register, login, updateProfile, checkAuth} from "../../utils/MainApi";
import { getMovies, getBookmarkedMovies, unBookMarkMovie, bookmarkMovie } from "../../utils/MoviesApi";

import Validator from "../../utils/Validator";
import {
  EMPTY_REQUEST_ERROR,
  ESC_KEY,
  FAILED_REQUEST_ERROR,
  NO_RESULTS_ERROR
} from "../../utils/constants";

function App() {

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [submitError, setSubmitError] = useState('');

  const [searchValue, setSearchValue] = React.useState("");

  const [movies, setMovies] = React.useState(storedMovies);

  const [savedMovies, setSavedMovies] = React.useState(savedMoviesInStore);

  const [searchError, setSearchError] = React.useState("");

  const [isShortMovie, setIsShortMovie] = React.useState(false);

  const history = useHistory();

  function checkUserData(token) {
    checkAuth(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch((err) => console.log(`Произошла ошибка в функции checkUserData: ${err}`));
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      checkUserData(token);
    }
  }, []);

  function handleRegister(data) {
    setIsLoading(true);
    setIsValid(true);
    register(data.username, data.email, data.password)
      .then(() => {
        handleLogin(data);
        setCurrentUser(data.username);
      })
      .catch((err) => {
        console.log(`Произошла ошибка в функции handleRegister: ${err}`);
        setSubmitError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin(data) {
    setIsLoading(true);
    setIsValid(true);
    login(data.email, data.password)
      .then((res) => {
        if (res.token) {
          checkUserData(res.token);
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка в функции handleLogin: ${err}`);
        setSubmitError(err);
      })
      .finally(() => {
        setIsLoading(false);
        history.push('/movies');
      });
  }

  function handleLogout(evt) {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundedMovies');
    localStorage.removeItem('storedMovies');
    setLoggedIn(false);
    history.push('/');
  }

  function handleEditProfile(data, setIsEditing, setPopupIsOpened) {
    setIsLoading(true);
    updateProfile(data.name, data.email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Произошла ошибка в функции handleEditProfile: ${err.status}`);
        setSubmitError(err.status);
      })
      .finally(() => {
        setIsLoading(false);
        setIsEditing(false);
        setPopupIsOpened(true);
      });
  }

  function handleOpenMenu() {
    setMenuIsOpened(true);
    window.addEventListener('click', handleClosePopupWithOverlayClick);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  function handleCloseMenu() {
    setMenuIsOpened(false);
    window.removeEventListener('click', handleClosePopupWithOverlayClick);
    window.removeEventListener('keydown', handleClosePopupWithEsc);
  }

  function handleClosePopupWithEsc(event) {
    if (event.keyCode === ESC_KEY) {
      handleCloseMenu();
    }
  }

  function handleClosePopupWithOverlayClick(evt) {
    const target = evt.target.classList;
    if ((target.contains('navigation__wrapper')) || (target.contains('popup'))) {
      handleCloseMenu();
    }
  }

  function movieFilter(movies) {
    return new Promise((resolve, reject) => {
      if (!movies) {
        return reject(FAILED_REQUEST_ERROR);
      }

      const moviesData = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      });

      if (moviesData.length === 0) {
        return reject(NO_RESULTS_ERROR);
      }
      localStorage.setItem('storedMovies', JSON.stringify(moviesData));
      setMovies(moviesData);
      resolve();
    });
  }

  function searchMovies(evt) {
    const foundedMovies = localStorage.getItem('foundedMovies');
    evt.preventDefault();
    setIsLoading(true);
    setSearchError('');
    setMovies([]);

    if (foundedMovies === '' || foundedMovies === null) {
      getMovies()
        .then((movies) => {
          localStorage.setItem('foundedMovies', JSON.stringify(movies));
          movieFilter(movies)
            .then(() => {})
            .catch((err) => {
              console.log(`Произошла ошибка в функции searchMovies (movieFilter): ${err}`);
              setSearchError(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(`Произошла ошибка в функции searchMovies (getMovies): ${err}`);
          setSearchError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      movieFilter(JSON.parse(localStorage.getItem('foundedMovies')))
        .then(() => {})
        .catch((err) => setSearchError(err))
        .finally(() => setIsLoading(false));
    }
  }

  function searchBookmarkedMovies(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setSearchError('');
    setSavedMovies(savedMoviesInStore);
    getBookmarkedMovies()
      .then((movies) => {
        if (searchValue === '') {
          throw new Error(EMPTY_REQUEST_ERROR);
        }
        if (!movies) {
          throw new Error(FAILED_REQUEST_ERROR);
        }

        const foundedMovies = movies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (foundedMovies.length === 0) {
          throw new Error(NO_RESULTS_ERROR);
        }

        setSavedMovies(foundedMovies);

      })
      .catch((err) => {
        console.log(`Произошла ошибка в функции searchBookmarkedMovies (getBookmarkedMovies): ${err}`);
        setSearchError(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSearchInput(evt) {
    setSearchValue(evt.target.value);
  }

  function handleBookMarkMovie(movie, isBookmarked, setIsBookmarked) {
    if (isBookmarked) {
      getBookmarkedMovies()
        .then((res) => {
          Promise.resolve(res.movies.find((item) => item.movieId === movie.id))
            .then((movieId) => {
              unBookMarkMovie(movieId._id)
                .then(() => {
                  const updatedMoviesList = savedMovies.filter((i) => i._id !== movieId._id);
                  localStorage.setItem('savedMovies', JSON.stringify(updatedMoviesList));
                  const movies = JSON.parse(localStorage.getItem('savedMovies'));
                  setSavedMovies(movies);
                  setIsBookmarked(false);
                })
                .catch((err) => console.log(`Произошла ошибка в функции handleBookMarkMovie (unBookMarkMovie) ${err}`));

            })
            .catch((err) => console.log(`Произошла ошибка в функции handleBookMarkMovie (Promise) ${err}`));

        })
        .catch((err) => console.log(`Произошла ошибка в функции handleBookMarkMovie (getBookmarkedMovies) ${err}`));

    } else {
      setIsBookmarked(true);
      bookmarkMovie(movie)
        .then(() => {
          getBookmarkedMovies()
            .then((res) => {
              localStorage.setItem('savedMovies', JSON.stringify(res));
              const movies = JSON.parse(localStorage.getItem('savedMovies'));
              setSavedMovies(movies);
              setIsBookmarked(true);
            })
            .catch((err) => console.log(`Произошла ошибка в функции handleBookMarkMovie (getBookmarkedMovies) ${err}`));

        })
        .catch((err) => console.log(`Произошла ошибка в функции handleBookMarkMovie (bookmarkMovie) ${err}`));

    }
  }

  const handleUnBookMarkMovie = (movie) => {
    unBookMarkMovie(movie._id)
      .then(() => {
        const updatedMoviesList = savedMovies.filter((item) => item._id !== movie._id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedMoviesList));
        const movies = JSON.parse(localStorage.getItem('savedMovies'));
        setSavedMovies(movies);
      })
      .catch((err) => console.log(`Произошла ошибка в функции handleUnBookMarkMovie ${err}`));
  }

  function checkIsShortMovie(evt) {
    evt.target.checked ? setIsShortMovie(true) : setIsShortMovie(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onLogin={handleLogin}
                values={values}
                isLoading={isLoading}
                handleOnChange={handleOnChange}
                errors={errors}
                isValid={isValid}
                submitError={submitError}
              />
            )}
          </Route>

          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onRegister={handleRegister}
                handleOnChange={handleOnChange}
                values={values}
                isLoading={isLoading}
                errors={errors}
                isValid={isValid}
                submitError={submitError}
              />
            )}
          </Route>

          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            movies={movies}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
            isLoading={isLoading}
            onSubmit={searchMovies}
            onChange={handleSearchInput}
            onSaveMovie={handleBookMarkMovie}
            handleShortCheck={checkIsShortMovie}
            isShortMovie={isShortMovie}
            searchError={searchError}
            searchValue={searchValue}
            savedMovies={savedMovies}
          />

          <ProtectedRoute
            exact path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
            onDeleteMovie={handleUnBookMarkMovie}
            onSubmit={searchBookmarkedMovies}
            onChange={handleSearchInput}
            searchValue={searchValue}
          />

          <ProtectedRoute
            exact path="/profile"
            component={Profile}
            onSubmit={handleEditProfile}
            loggedIn={loggedIn}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
            onLogout={handleLogout}
            submitError={submitError}
            values={values}
            isLoading={isLoading}
            handleOnChange={handleOnChange}
            isValid={isValid}
            errors={errors}
          />

          <Route path="*">
            <NotFoundPage />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
