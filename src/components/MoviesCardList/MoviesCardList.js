import React from 'react';
import { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const {
    localData,
    isRequestingServer,
    moviesSearchError,
    moviesNotFound,
    moviesLimit,
    additionalMovies,
    emptySearchError,
    onSaveMovie,
    onDeleteMovie,
    type,
    moviesNotFoundInSaved,
    emptySearchErrorInSaved,
  } = props;

  const [currentLimit, setCurrentLimit] = useState(moviesLimit || +Infinity);

  const getMoviesToShow = () => {
    if (type === 'default') {
      return localData.moviesToShowFilteredByShort?.length > 0
        ? localData.moviesToShowFilteredByShort
        : localData.moviesToShow;
    } else {
      if (localData.savedMoviesToShowFilteredByShort?.length > 0)
        return localData.savedMoviesToShowFilteredByShort;
      if (localData.savedMoviesToShow?.length > 0)
        return localData.savedMoviesToShow;
      return localData.savedMovies;
    }
  };

  const getErrorText = () => {
    if (moviesSearchError)
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    if (moviesNotFound || moviesNotFoundInSaved) return 'Ничего не найдено';
    if (emptySearchError || emptySearchErrorInSaved)
      return 'Необходимо ввести фразу для поиска';
    if (
      !moviesSearchError &&
      !moviesNotFound &&
      !emptySearchError &&
      !moviesNotFoundInSaved &&
      !emptySearchErrorInSaved
    )
      return '';
  };

  const getMoreButtonState = () => {
    if (type === 'default') {
      return moviesToShow?.length > currentLimit;
    } else {
      return false;
    }
  };

  const gotError =
    moviesSearchError ||
    moviesNotFound ||
    moviesNotFoundInSaved ||
    emptySearchError ||
    emptySearchErrorInSaved;
  const errorText = getErrorText();

  const moviesToShow = getMoviesToShow();
  const showMoreButton = getMoreButtonState();

  function handleAddMoreMovies() {
    setCurrentLimit(currentLimit + additionalMovies);
  }
  return (
    <section className='movies'>
      {isRequestingServer ? (
        <Preloader />
      ) : gotError ? (
        <span className='movies__error'>{errorText}</span>
      ) : (
        <>
          <ul className='movies__list'>
            {moviesToShow &&
              moviesToShow.map((movie, index) => {
                if (index < currentLimit) {
                  return (
                    <MoviesCard
                      key={type === 'default' ? movie.id : movie.movieId}
                      movie={movie}
                      type={type}
                      onSaveMovie={onSaveMovie}
                      onDeleteMovie={onDeleteMovie}
                    />
                  );
                }
                return null;
              })}
          </ul>
          {showMoreButton && (
            <div className='movies__btn-wrapper'>
              <button
                className='movies__more-btn'
                type='button'
                aria-label='Показать ещё фильмы'
                onClick={handleAddMoreMovies}
              >
                Ещё
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
