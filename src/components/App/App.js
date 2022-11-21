import './App.css';
import { React, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import {
  SHORT_MOVIE_MAX_DURATION,
  SCREEN_LARGE_MAX_WIDTH,
  SCREEN_MEDIUM_MAX_WIDTH,
  SCREEN_SMALL_MAX_WIDTH,
  LIMIT_MOVIES_LARGE,
  LIMIT_MOVIES_MEDIUM,
  LIMIT_MOVIES_SMALL,
  ADDITIONAL_MOVIES_LARGE,
  ADDITIONAL_MOVIES_MEDIUM,
  ADDITIONAL_MOVIES_SMALL,
} from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const [serverResponseAuthText, setServerResponseAuthText] = useState('');
  const [serverResponseUserUpdateText, setsServerResponseUserUpdateText] =
    useState('');

  const [localData, setLocalData] = useState({
    searchValue: '',
    isShortMoviesChecked: false,
    moviesToShow: [],
    moviesToShowFilteredByShort: [],
    movies: [],
    savedMovies: [],
    savedMoviesToShow: [],
    searchValueInSaved: '',
    isShortMoviesInSaveChecked: false,
    savedMoviesToShowFilteredByShort: [],
  });
  const [moviesNotFound, setMoviesNotFound] = useState(false);
  const [moviesSearchError, setMoviesSearchError] = useState(false);
  const [emptySearchError, setEmptySearchError] = useState(false);
  const [moviesNotFoundInSaved, setMoviesNotFoundInSaved] = useState(false);
  const [emptySearchErrorInSaved, setEmptySearchErrorInSaved] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
  const [isShortMoviesInSaveChecked, setIsShortMoviesInSaveChecked] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchValueInSaved, setSearchValueInSaved] = useState('');
  const [moviesLimit, setMoviesLimit] = useState(LIMIT_MOVIES_SMALL);
  const [additionalMovies, setAdditionalMovies] = useState(
    ADDITIONAL_MOVIES_SMALL
  );

  const goTo = useNavigate();

  const getCurrentUserInfo = () => {
    setIsRequestingServer(true);
    return mainApi
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsRequestingServer(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Получение сохраненных фильмов при логине
  useEffect(() => {
    if (isLoggedIn) {
      const localData = getDataFromLocalStore();
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          saveDataToLocalStore({ ...localData, savedMovies: movies });
          setLocalData({ ...localData, savedMoviesToShow: movies });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  // Получаение данных из хранилища при монтировании
  useEffect(() => {
    const localData = getDataFromLocalStore();
    if (localData) {
      setLocalData(localData);
      setSearchValue(localData.searchValue);
      setIsShortMoviesChecked(localData.isShortMoviesChecked);
    }
  }, []);

  // Обработчик регистрации пользователя
  const handleRegister = (data) => {
    setIsRequestingServer(true);
    mainApi
      .registerNewUser(data)
      .then((res) => {
        handleLogin(data);
        setServerResponseAuthText('Регистрация выполнена.');
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Error: 409') {
          setServerResponseAuthText(
            'Пользователь с таким E-mail уже существует.'
          );
        } else {
          setServerResponseAuthText('Что-то пошло не так. Попробуйте позже.');
        }
      })
      .finally(() => {
        setIsRequestingServer(false);
      });
  };

  // Обработчик логина пользователя
  const handleLogin = (data) => {
    setIsRequestingServer(true);
    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        getCurrentUserInfo()
          .then(() => {
            goTo('/movies');
          })
          .catch((err) => console.log(err));
        setIsLoggedIn(true);
        setServerResponseAuthText('Вход выполнен.');
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Error: 401') {
          setServerResponseAuthText(
            'Пользователь не найден. Проверьте правильность имени и пароля.'
          );
        } else {
          setServerResponseAuthText('Что-то пошло не так. Попробуйте позже.');
        }
      })
      .finally(() => {
        setIsRequestingServer(false);
      });
  };

  // Обработчик выхода из сессии
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    setLocalData({});
    setSearchValue('');
    setSearchValueInSaved('');
    setIsShortMoviesChecked(false);
    setIsShortMoviesInSaveChecked(false);
    localStorage.removeItem('localData');
    goTo('/');
  };

  // Обработчик апдейта пользовательских данных
  const handleUpdateUser = (data) => {
    setIsRequestingServer(true);
    mainApi
      .updatetUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setsServerResponseUserUpdateText('Данные обновлены');
      })
      .catch((err) => {
        setsServerResponseUserUpdateText('Ошибка при обновлении данных');
      })
      .finally(() => setIsRequestingServer(false));
  };

  //поиск фильмов
  const handleSearchMovies = (string, showShortMovies) => {
    setIsRequestingServer(true);
    setMoviesNotFound(false);
    setMoviesSearchError(false);
    setEmptySearchError(false);

    const localData = getDataFromLocalStore();

    if (string.length === 0) {
      localData.moviesToShow = [];
      localData.moviesToShowFilteredByShort = [];
      localData.searchValue = string;
      localData.isShortMoviesChecked = showShortMovies;

      saveDataToLocalStore(localData);
      setLocalData(localData);
      setEmptySearchError(true);
      setIsRequestingServer(false);
      return;
    }

    if (localData.movies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          saveDataToLocalStore({
            movies: movies,
            savedMovies: savedMovies,
          });

          synchronizeSavedMovies(); // Синхронизация сохраненных с бэкендом

          const localData = getDataFromLocalStore();

          localData.searchValue = string;
          localData.isShortMoviesChecked = showShortMovies;

          localData.moviesToShow = filterByString(localData.movies, string);

          if (localData.moviesToShow.length === 0) {
            setMoviesNotFound(true);
            setIsRequestingServer(false);
            return;
          }

          if (showShortMovies) {
            localData.moviesToShowFilteredByShort = filterByLength(
              localData.moviesToShow
            );

            if (localData.moviesToShowFilteredByShort.length === 0) {
              setMoviesNotFound(true);
              setIsRequestingServer(false);
              return;
            }
          }

          saveDataToLocalStore(localData);
          setLocalData(localData);
          setMoviesNotFound(false);
        })
        .catch((err) => {
          setMoviesSearchError(true);
        })
        .finally(() => {
          setIsRequestingServer(false);
        });
    } else {
      localData.searchValue = string;
      localData.isShortMoviesChecked = showShortMovies;

      localData.moviesToShow = filterByString(localData.movies, string);

      if (localData.moviesToShow.length === 0) {
        localData.moviesToShow = [];
        localData.moviesToShowFilteredByShort = [];
        localData.searchValue = string;
        localData.isShortMoviesChecked = showShortMovies;
        saveDataToLocalStore(localData);
        setLocalData(localData);
        setMoviesNotFound(true);
        setIsRequestingServer(false);
        return;
      }

      if (showShortMovies) {
        localData.moviesToShowFilteredByShort = filterByLength(
          localData.moviesToShow
        );

        if (localData.moviesToShowFilteredByShort.length === 0) {
          setMoviesNotFound(true);
          setIsRequestingServer(false);
          return;
        }
      }

      saveDataToLocalStore(localData);

      setLocalData(localData);
      setIsRequestingServer(false);
      setMoviesNotFound(false);
    }
  };

  // Поиск фильмов в сохраненных
  const handleSearchInSavedMovies = (string, showShortMovies) => {
    const data = { ...localData };

    if (string.length === 0) {
      data.savedMoviesToShow = [];
      data.savedMoviesToShowFilteredByShort = [];
      data.searchValueInSaved = string;
      data.isShortMoviesInSaveChecked = showShortMovies;

      setLocalData(data);
      setEmptySearchErrorInSaved(true);
      return;
    }

    data.searchValueInSaved = string;
    data.isShortMoviesInSaveChecked = showShortMovies;

    data.savedMoviesToShow = filterByString(data.savedMovies, string);

    if (data.savedMoviesToShow.length === 0) {
      data.savedMoviesToShow = [];
      data.savedMoviesToShowFilteredByShort = [];
      data.searchValueInSaved = string;
      data.isShortMoviesInSaveChecked = showShortMovies;
      setLocalData(data);
      setMoviesNotFoundInSaved(true);
      return;
    }

    if (showShortMovies) {
      data.moviesSavedToShowFilteredByShort = filterByLength(
        data.savedMoviesToShow
      );

      if (data.moviesSavedToShowFilteredByShort.length === 0) {
        setMoviesNotFoundInSaved(true);
        return;
      }
    }
    setLocalData(data);
    setMoviesNotFoundInSaved(false);
  };

  function handleCheckShortMovies(checked, type) {
    setMoviesNotFound(false);
    setMoviesNotFoundInSaved(false);

    if (type === 'default') {
      const localData = getDataFromLocalStore();
      setIsShortMoviesChecked(checked);
      if (checked) {
        localData.moviesToShowFilteredByShort = filterByLength(
          localData.moviesToShow
        );
      } else {
        localData.moviesToShowFilteredByShort = [];
      }
      localData.isShortMoviesChecked = checked;
      if (checked && localData.moviesToShowFilteredByShort.length === 0) {
        setMoviesNotFound(true);
      }
      saveDataToLocalStore(localData);
      setLocalData(localData);
    } else {
      const data = { ...localData };
      setIsShortMoviesInSaveChecked(checked);
      if (checked) {
        data.savedMoviesToShowFilteredByShort = filterByLength(
          data.savedMoviesToShow
        );
      } else {
        data.savedMoviesToShowFilteredByShort = [];
      }
      data.isShortMoviesInSaveChecked = checked;
      if (checked && data.savedMoviesToShowFilteredByShort.length === 0) {
        setMoviesNotFoundInSaved(true);
      }
      setLocalData(data);
    }
  }

  function handleChangeSearchValue(value, type) {
    if (type === 'default') setSearchValue(value);
    else setSearchValueInSaved(value);
  }

  const saveDataToLocalStore = (data) => {
    const {
      searchValue = '',
      isShortMoviesChecked = false,
      moviesToShow = [],
      moviesToShowFilteredByShort = [],
      movies = [],
      savedMovies = [],
    } = data;
    localStorage.setItem(
      'localData',
      JSON.stringify({
        searchValue,
        isShortMoviesChecked,
        moviesToShow,
        moviesToShowFilteredByShort,
        movies,
        savedMovies,
      })
    );
  };

  const getDataFromLocalStore = () => {
    return JSON.parse(localStorage.getItem('localData'));
  };

  function filterByLength(movies) {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIE_MAX_DURATION);
  }

  const filterByString = (movies, string) => {
    return movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(string.toLowerCase())
    );
  };

  // Проверка ширины экрана
  useEffect(() => {
    getMoviesLimitByScreenWidth();
    getAdditionalMoviesByScreenWidth();
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  // Получение маскимального количества фильмов на странице
  function getMoviesLimitByScreenWidth() {
    let moviesLimit;

    if (window.innerWidth >= SCREEN_LARGE_MAX_WIDTH) {
      moviesLimit = LIMIT_MOVIES_LARGE;
    }

    if (
      (window.innerWidth < SCREEN_LARGE_MAX_WIDTH &&
        window.innerWidth >= SCREEN_MEDIUM_MAX_WIDTH) ||
      (window.innerWidth < SCREEN_MEDIUM_MAX_WIDTH &&
        window.innerWidth > SCREEN_SMALL_MAX_WIDTH)
    ) {
      moviesLimit = LIMIT_MOVIES_MEDIUM;
    }

    if (window.innerWidth <= SCREEN_SMALL_MAX_WIDTH) {
      moviesLimit = LIMIT_MOVIES_SMALL;
    }

    setMoviesLimit(moviesLimit);
  }

  // Получение количества фильмов для добавления
  function getAdditionalMoviesByScreenWidth() {
    let additionalMovies;

    if (window.innerWidth >= SCREEN_LARGE_MAX_WIDTH) {
      additionalMovies = ADDITIONAL_MOVIES_LARGE;
    }

    if (
      (window.innerWidth < SCREEN_LARGE_MAX_WIDTH &&
        window.innerWidth >= SCREEN_MEDIUM_MAX_WIDTH) ||
      (window.innerWidth < SCREEN_MEDIUM_MAX_WIDTH &&
        window.innerWidth > SCREEN_SMALL_MAX_WIDTH)
    ) {
      additionalMovies = ADDITIONAL_MOVIES_MEDIUM;
    }

    if (window.innerWidth <= SCREEN_SMALL_MAX_WIDTH) {
      additionalMovies = ADDITIONAL_MOVIES_SMALL;
    }

    setAdditionalMovies(additionalMovies);
  }

  function changeWindowSize() {
    getMoviesLimitByScreenWidth();
    getAdditionalMoviesByScreenWidth();
  }

  const handleSaveMovie = (movie, movieThumbnail) => {
    const {
      id,
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year,
    } = movie;
    mainApi
      .saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image: movieThumbnail,
        trailerLink,
        thumbnail: movieThumbnail,
        movieId: id,
        nameRU,
        nameEN,
      })
      .then((movie) => {
        correctDataBySaves(false, movie, movie.movieId);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (id) => {
    mainApi
      .deleteMovie(id)
      .then(() => {
        correctDataBySaves(true, {}, id);
      })
      .catch((err) => console.log(err));
  };

  const correctDataBySaves = (isSaved, movie, id) => {
    const localData = getDataFromLocalStore();

    if (!isSaved) {
      localData.savedMovies.push(movie);
    } else {
      const movieIndex = localData.savedMovies.findIndex(
        (element) => element._id === id
      );
      if (movieIndex > -1) {
        localData.savedMovies[movieIndex].isSaved = !isSaved;
        localData.savedMovies.splice(movieIndex, 1);
      }
    }

    if (localData?.movies.length > 0) {
      const moviesList = [
        localData.movies,
        localData.moviesToShow,
        localData.moviesToShowFilteredByShort,
      ];

      moviesList.forEach((list) => {
        if (!isSaved) {
          const movieIndex = list.findIndex((element) => element.id === id);
          if (movieIndex > -1) {
            list[movieIndex]._id = movie._id;
            list[movieIndex].isSaved = !isSaved;
          }
        } else {
          const movieIndex = list.findIndex((element) => element._id === id);
          if (movieIndex > -1) {
            list[movieIndex].isSaved = !isSaved;
          }
        }

        saveDataToLocalStore(localData);
        setLocalData(localData);
      });
    }
  };

  const synchronizeSavedMovies = () => {
    const localData = getDataFromLocalStore();
    let movieIndex;
    if (localData.savedMovies?.length > 0 && localData.movies?.length > 0) {
      localData.savedMovies.forEach((movie) => {
        movieIndex = localData.movies.findIndex(
          (element) => element.id === movie.movieId
        );
        if (movieIndex > -1) {
          localData.movies[movieIndex]._id = movie._id;
          localData.movies[movieIndex].isSaved = true;
        }
        saveDataToLocalStore(localData);
        setLocalData(localData);
      });
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className='container'>
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path='/sign-up'
              element={
                <Register
                  onRegister={handleRegister}
                  isRequestingServer={isRequestingServer}
                  serverResponseText={serverResponseAuthText}
                />
              }
            />
            <Route
              path='/sign-in'
              element={
                <Login
                  onLogin={handleLogin}
                  isRequestingServer={isRequestingServer}
                  serverResponseText={serverResponseAuthText}
                />
              }
            />
            <Route
              exact
              path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  isRequestingServer={isRequestingServer}
                  localData={localData}
                  onSearchMovies={handleSearchMovies}
                  onCheckShortMovies={handleCheckShortMovies}
                  isShortMoviesChecked={isShortMoviesChecked}
                  searchValue={searchValue}
                  onChangeSearchValue={handleChangeSearchValue}
                  moviesSearchError={moviesSearchError}
                  moviesNotFound={moviesNotFound}
                  emptySearchError={emptySearchError}
                  moviesLimit={moviesLimit}
                  additionalMovies={additionalMovies}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              exact
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isRequestingServer={isRequestingServer}
                  localData={localData}
                  onDeleteMovie={handleDeleteMovie}
                  onChangeSearchValue={handleChangeSearchValue}
                  searchValueInSaved={searchValueInSaved}
                  onSearchInSavedMovies={handleSearchInSavedMovies}
                  isShortMoviesInSaveChecked={isShortMoviesInSaveChecked}
                  onCheckShortMovies={handleCheckShortMovies}
                  moviesNotFoundInSaved={moviesNotFoundInSaved}
                  emptySearchErrorInSaved={emptySearchErrorInSaved}
                />
              }
            />
            <Route
              exact
              path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  onLogOut={handleLogOut}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isRequestingServer}
                  serverResponseUserUpdateText={serverResponseUserUpdateText}
                />
              }
            />
            <Route exact path='/' element={<Main />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
