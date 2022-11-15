import { Link } from 'react-router-dom';
import React from 'react';
import './Logo.css';
import logo from '../../images/logo.svg';

const Logo = () => {
  return (
    <Link to='/' className='logo'>
      <img className='logo__image' src={logo} alt='Логотип' />
    </Link>
  );
};

export default Logo;
