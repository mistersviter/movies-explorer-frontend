import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
  return (
    <>
      <Header isLoggedIn={true} activeLink='movies' />
      <main className='movies-block'>
        <SearchForm />
        <MoviesCardList type='default' />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
