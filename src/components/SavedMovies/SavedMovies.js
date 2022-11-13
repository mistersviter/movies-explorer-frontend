import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
      <Header isLoggedIn={true} activeLink='saved-movies' />
      <main className='saved-movies-block'>
        <SearchForm />
        <MoviesCardList type='saved-movies' />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
