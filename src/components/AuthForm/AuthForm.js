import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import Error from '../Error/Error';
import Logo from '../Logo/Logo';

const AuthForm = (props) => {
  const {
    title,
    formName,
    children,
    buttonText,
    suggestionText,
    linkRoute,
    linkText,
  } = props;

  return (
    <section className='auth-form'>
      <Logo />
      <h2 className='auth-form__title'>{title}</h2>
      <form
        name={`form-${formName}`}
        id={`form-${formName}`}
        className='auth-form__form'
      >
        {children}
        <Error
          className='auth-form__error'
          id={`submit-${formName}-error`}
          text=''
        />
        <button
          className='auth-form__submit-btn'
          type='submit'
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </form>

      <p className='auth-form__suggestion'>
        {`${suggestionText} `}
        <Link to={linkRoute} className='auth-form__link'>
          {linkText}
        </Link>
      </p>
    </section>
  );
};

export default AuthForm;
