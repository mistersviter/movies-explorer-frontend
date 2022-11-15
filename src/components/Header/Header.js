import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import Logo from '../Logo/Logo';

const Header = (props) => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Logo />
        <Navigation
          isLoggedIn={props.isLoggedIn}
          activeLink={props.activeLink}
        />
      </div>
    </header>
  );
};

export default Header;
