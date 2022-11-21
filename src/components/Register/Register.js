import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Error from '../Error/Error';
import './Register.css';

const Register = (props) => {
  const { onRegister, isRequestingServer, serverResponseAuthText } = props;

  const {
    values,
    handleChangeInput,
    resetFrom,
    errors,
    isValid,
    isValidInputs,
  } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailRegister, passwordRegister, nameRegister } = values;
    const newUser = {
      email: emailRegister,
      password: passwordRegister,
      name: nameRegister,
    };
    onRegister(newUser);
    resetFrom();
  };

  return (
    <main className='register-block'>
      <AuthForm
        title='Добро пожаловать!'
        formName='register'
        isRequestingServer={isRequestingServer}
        buttonText='Зарегистрироваться'
        suggestionText='Уже зарегистрированы?'
        linkRoute='/sign-in'
        linkText='Войти'
        isValid={isValid}
        onSubmit={handleSubmit}
        serverResponseAuthText={serverResponseAuthText}
      >
        <label className='auth-form__label' htmlFor='nameRegister'>
          Имя
        </label>
        <input
          className={
            isValidInputs?.nameRegister ||
            !isValidInputs.hasOwnProperty('nameRegister')
              ? 'auth-form__input'
              : 'auth-form__input auth-form__input_error'
          }
          type='text'
          pattern='^[а-яА-ЯёЁa-zA-Z\- ]+$'
          name='nameRegister'
          id='nameRegister'
          minLength='2'
          maxLength='30'
          onChange={handleChangeInput}
          required
          disabled={isRequestingServer}
        />
        <Error
          className='auth-form__error'
          id='register-input-email-error'
          text={errors.nameRegister}
        />

        <label className='auth-form__label' htmlFor='emailRegister'>
          E-mail
        </label>
        <input
          className={
            isValidInputs?.emailRegister ||
            !isValidInputs.hasOwnProperty('emailRegister')
              ? 'auth-form__input'
              : 'auth-form__input auth-form__input_error'
          }
          type='email'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          name='emailRegister'
          id='emailRegister'
          onChange={handleChangeInput}
          required
          disabled={isRequestingServer}
        />
        <Error
          className='auth-form__error'
          id='register-input-email-error'
          text={errors.emailRegister}
        />

        <label className='auth-form__label' htmlFor='passwordRegister'>
          Пароль
        </label>
        <input
          className={
            isValidInputs?.passwordRegister ||
            !isValidInputs.hasOwnProperty('passwordRegister')
              ? 'auth-form__input'
              : 'auth-form__input auth-form__input_error'
          }
          type='password'
          name='passwordRegister'
          id='passwordRegister'
          minLength='3'
          maxLength='10'
          onChange={handleChangeInput}
          required
          disabled={isRequestingServer}
        />
        <Error
          className='auth-form__error'
          id='password-input-email-error'
          text={errors.passwordRegister}
        />
      </AuthForm>
    </main>
  );
};

export default Register;
