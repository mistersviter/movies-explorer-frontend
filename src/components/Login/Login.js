import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import Error from '../Error/Error';
import './Login.css';

const Login = () => {
  return (
    <main className='login-block'>
      <AuthForm
        title='Рады видеть!'
        formName='login'
        buttonText='Войти'
        suggestionText='Ещё не зарегистрированы?'
        linkRoute='/sign-up'
        linkText='Регистрация'
      >
        <label className='auth-form__label' htmlFor='email-login'>
          E-mail
        </label>
        <input
          className='auth-form__input'
          type='email'
          name='email-login'
          id='email-login'
          required
        />
        <Error
          className='auth-form__error'
          id='login-input-email-error'
          text=''
        />

        <label className='auth-form__label' htmlFor='password-login'>
          Пароль
        </label>
        <input
          className='auth-form__input'
          type='password'
          name='password-login'
          id='password-login'
          required
        />
        <Error
          className='auth-form__error'
          id='password-input-email-error'
          text=''
        />
      </AuthForm>
    </main>
  );
};

export default Login;
