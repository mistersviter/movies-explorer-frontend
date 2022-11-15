import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import Error from '../Error/Error';
import './Register.css';

const Register = () => {
  return (
    <main className='register-block'>
      <AuthForm
        title='Добро пожаловать!'
        formName='register'
        buttonText='Зарегистрироваться'
        suggestionText='Уже зарегистрированы?'
        linkRoute='/sign-in'
        linkText='Войти'
      >
        <label className='auth-form__label' htmlFor='name-register'>
          Имя
        </label>
        <input
          className='auth-form__input'
          type='text'
          name='name-register'
          id='name-register'
          required
        />
        <Error
          className='auth-form__error'
          id='register-input-email-error'
          text=''
        />

        <label className='auth-form__label' htmlFor='email-register'>
          E-mail
        </label>
        <input
          className='auth-form__input'
          type='email'
          name='email-register'
          id='email-register'
          required
        />
        <Error
          className='auth-form__error'
          id='register-input-email-error'
          text=''
        />

        <label className='auth-form__label' htmlFor='password-register'>
          Пароль
        </label>
        <input
          className='auth-form__input'
          type='password'
          name='password-register'
          id='password-register'
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

export default Register;
