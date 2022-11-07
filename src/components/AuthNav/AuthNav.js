import React from 'react';
import { NavLink } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = () => {
  return (
    <nav className='auth-nav'>
      <ul className='auth-nav__list'>
        <li className='auth-nav__item'>
          <NavLink to='/sign-up' className='auth-nav__link'>
            Регистрация
          </NavLink>
        </li>
        <li className='auth-nav__item_type_login'>
          <NavLink
            to='/sign-in'
            className='auth-nav__link auth-nav__link_type_login'
          >
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
