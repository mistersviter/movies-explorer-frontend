import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const {
    isRequestingServer,
    onSearchMovies,
    onCheckShortMovies,
    onChangeSearchValue,
    searchValue,
    isShortMoviesChecked,
    localData,
    moviesSearchError,
    moviesNotFound,
    moviesLimit,
    additionalMovies,
    emptySearchError,
    onSaveMovie,
    onDeleteMovie,
  } = props;

  return (
    <>
      <Header activeLink='movies' />
      <main className='movies-block'>
        <SearchForm
          type='default'
          localData={localData}
          onSearchMovies={onSearchMovies}
          onCheckShortMovies={onCheckShortMovies}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          isShortMoviesChecked={isShortMoviesChecked}
        />
        <MoviesCardList
          type='default'
          localData={localData}
          isRequestingServer={isRequestingServer}
          moviesSearchError={moviesSearchError}
          moviesNotFound={moviesNotFound}
          moviesLimit={moviesLimit}
          additionalMovies={additionalMovies}
          emptySearchError={emptySearchError}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
