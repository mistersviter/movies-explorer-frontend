import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Error from '../Error/Error';
import './Login.css';

const Login = (props) => {
  const { onLogin, isRequestingServer, serverResponseAuthText } = props;

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
    const { emailLogin, passwordLogin } = values;
    const user = { email: emailLogin, password: passwordLogin };
    onLogin(user);
    resetFrom();
  };

  return (
    <main className='login-block'>
      <AuthForm
        title='Рады видеть!'
        formName='login'
        isRequestingServer={isRequestingServer}
        buttonText='Войти'
        suggestionText='Ещё не зарегистрированы?'
        linkRoute='/sign-up'
        linkText='Регистрация'
        isValid={isValid}
        onSubmit={handleSubmit}
        serverResponseAuthText={serverResponseAuthText}
      >
        <label className='auth-form__label' htmlFor='emailLogin'>
          E-mail
        </label>
        <input
          className={
            isValidInputs?.emailLogin ||
            !isValidInputs.hasOwnProperty('emailLogin')
              ? 'auth-form__input'
              : 'auth-form__input auth-form__input_error'
          }
          type='email'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          name='emailLogin'
          id='emailLogin'
          onChange={handleChangeInput}
          required
          disabled={isRequestingServer}
        />
        <Error
          className='auth-form__error'
          id='login-input-email-error'
          text={errors.emailLogin}
        />

        <label className='auth-form__label' htmlFor='passwordLogin'>
          Пароль
        </label>
        <input
          className={
            isValidInputs?.passwordLogin ||
            !isValidInputs.hasOwnProperty('passwordLogin')
              ? 'auth-form__input'
              : 'auth-form__input auth-form__input_error'
          }
          type='password'
          name='passwordLogin'
          id='passwordLogin'
          minLength='3'
          maxLength='10'
          onChange={handleChangeInput}
          required
          disabled={isRequestingServer}
        />
        <Error
          className='auth-form__error'
          id='password-input-email-error'
          text={errors.passwordLogin}
        />
      </AuthForm>
    </main>
  );
};

export default Login;
