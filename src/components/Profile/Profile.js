import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className='profile-block'>
        <section className='profile'>
          <h2 className='profile__title'>Привет, Виталий!</h2>
          <form className='profile__form'>
            <label
              htmlFor='name-edit'
              className='profile__label profile__label_type_name'
            >
              Имя
            </label>
            <input
              className='profile__input profile__input_type_name'
              type='text'
              name='name-edit'
              id='name-edit'
              defaultValue='Виталий'
              required
            />
            <label
              htmlFor='email-edit'
              className='profile__label profile__label_type_email'
            >
              E-mail
            </label>
            <input
              className='profile__input profile__input_type_email'
              type='email'
              name='email-edit'
              id='email-edit'
              defaultValue='pochta@yandex.ru'
              required
            />
            <button className='profile__button' type='submit'>
              Редактировать
            </button>
          </form>
          <Link to='/' className='profile__link'>
            Выйти из аккаунта
          </Link>
        </section>
      </main>
    </>
  );
}

export default Profile;
