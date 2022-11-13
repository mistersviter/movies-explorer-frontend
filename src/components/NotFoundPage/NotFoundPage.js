import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <header />
      <main className='not-found-page'>
        <h2 className='not-found-page__title'>404</h2>
        <p className='not-found-page__text'>Страница не найдена</p>
        <Link className='not-found-page__link' onClick={() => navigate(-1)}>
          Назад
        </Link>
      </main>
      <footer />
    </>
  );
}

export default NotFoundPage;
