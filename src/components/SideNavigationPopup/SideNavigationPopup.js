import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './SideNavigationPopup.css';

const SideNavigationPopup = (props) => {
  const { activeLink, closeSideNavigationHandler } = props;
  return (
    <div className='navigation-popup'>
      <nav className='navigation-popup__common-nav'>
        <ul className='navigation-popup__list'>
          <li className='navigation-popup__item'>
            <NavLink
              to='/'
              className={
                activeLink === 'main'
                  ? 'navigation-popup__link navigation-popup__link_active'
                  : 'navigation-popup__link'
              }
            >
              Главная
            </NavLink>
          </li>
          <li className='navigation-popup__item'>
            <NavLink
              to='/movies'
              className={
                activeLink === 'movies'
                  ? 'navigation-popup__link navigation-popup__link_active'
                  : 'navigation-popup__link'
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className='navigation-popup__item'>
            <NavLink
              to='/saved-movies'
              className={
                activeLink === 'saved-movies'
                  ? 'navigation-popup__link navigation-popup__link_active'
                  : 'navigation-popup__link'
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link className='navigation-popup__account-btn' to='/profile' >
          Аккаунт
        </Link>
      </nav>
      <button
        className='navigation-popup__close-btn'
        type='button'
        aria-label='Закрыть'
        onClick={closeSideNavigationHandler}
      ></button>
    </div>
  );
};

export default SideNavigationPopup;
