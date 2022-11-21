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
    isRequestingServer,
    buttonText,
    suggestionText,
    linkRoute,
    linkText,
    isValid,
    onSubmit,
    serverResponseAuthText,
  } = props;

  return (
    <section className='auth-form'>
      <Logo />
      <h2 className='auth-form__title'>{title}</h2>
      <form
        name={`form-${formName}`}
        id={`form-${formName}`}
        className='auth-form__form'
        onSubmit={onSubmit}
      >
        {children}
        <Error
          className='auth-form__error'
          id={`submit-${formName}-error`}
          text={serverResponseAuthText || ''}
        />
        <button
          className={
            isRequestingServer || !isValid
              ? 'auth-form__submit-btn auth-form__submit-btn_disabled'
              : 'auth-form__submit-btn'
          }
          type='submit'
          disabled={isRequestingServer || !isValid}
        >
          {isRequestingServer ? 'Подождите...' : buttonText}
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
