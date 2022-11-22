import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies(props) {
  const {
    isRequestingServer,
    localData,
    moviesNotFoundInSaved,
    emptySearchErrorInSaved,
    additionalMovies,
    onDeleteMovie,
    onChangeSearchValue,
    searchValueInSaved,
    onSearchInSavedMovies,
    isShortMoviesInSaveChecked,
    onCheckShortMovies,
  } = props;

  return (
    <>
      <Header activeLink='saved-movies' />
      <main className='saved-movies-block'>
        <SearchForm
          type='saved-movies'
          localData={localData}
          onChangeSearchValue={onChangeSearchValue}
          searchValueInSaved={searchValueInSaved}
          onSearchInSavedMovies={onSearchInSavedMovies}
          isShortMoviesInSaveChecked={isShortMoviesInSaveChecked}
          onCheckShortMovies={onCheckShortMovies}
        />
        <MoviesCardList
          type='saved-movies'
          localData={localData}
          isRequestingServer={isRequestingServer}
          additionalMovies={additionalMovies}
          onDeleteMovie={onDeleteMovie}
          moviesNotFoundInSaved={moviesNotFoundInSaved}
          emptySearchErrorInSaved={emptySearchErrorInSaved}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
