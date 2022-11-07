import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthNav from '../AuthNav/AuthNav';
import './Navigation.css';

const Navigation = (props) => {
  const { isLoggedIn, isActiveBurger } = props;

  return isLoggedIn ? (
    <>
      <nav className='common-nav'>
        <ul className='common-nav__list'>
          <li className='common-nav__item'>
            <NavLink to='/movies' className='common-nav__link'>
              Фильмы
            </NavLink>
          </li>
          <li className='common-nav__item_type_login'>
            <NavLink
              to='/saved-movies'
              className='common-nav__link common-nav__link_type_login'
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      <AuthNav />
      <button>уруру</button>
    </>
  ) : (
    <AuthNav />
  );
};

export default Navigation;
