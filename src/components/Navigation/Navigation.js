import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import AuthNav from '../AuthNav/AuthNav';
import './Navigation.css';
import SideNavigationPopup from '../SideNavigationPopup/SideNavigationPopup';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Navigation = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { activeLink } = props;

  const [sideNavigationPopupVisible, setSideNavigationPopupVisible] =
    useState(false);

  const closeSideNavigationPopup = () => {
    setSideNavigationPopupVisible(false);
  };

  const openSideNavigationPopup = () => {
    setSideNavigationPopupVisible(true);
  };

  return currentUser?.email ? (
    !sideNavigationPopupVisible ? (
      <>
        <nav className='common-nav'>
          <ul className='common-nav__list'>
            <li className='common-nav__item'>
              <NavLink
                to='/movies'
                className={
                  activeLink === 'movies'
                    ? 'common-nav__link common-nav__link_active'
                    : 'common-nav__link'
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li className='common-nav__item'>
              <NavLink
                to='/saved-movies'
                className={
                  activeLink === 'saved-movies'
                    ? 'common-nav__link common-nav__link_active'
                    : 'common-nav__link'
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link className='common-nav__account-btn' to='/profile'>
            Аккаунт
          </Link>
        </nav>
        <button
          className='burger-btn'
          type='button'
          aria-label='Меню'
          onClick={openSideNavigationPopup}
        ></button>
      </>
    ) : (
      <SideNavigationPopup
        activeLink={activeLink}
        closeSideNavigationHandler={closeSideNavigationPopup}
      />
    )
  ) : (
    <AuthNav />
  );
};

export default Navigation;
