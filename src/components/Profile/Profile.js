import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './Profile.css';
import Error from '../Error/Error';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile(props) {
  const {onLogOut, onUpdateUser, isRequestingServer, serverResponseUserUpdateText} = props;
  const { currentUser } = useContext(CurrentUserContext);
  const defaultValues = { nameEdit: currentUser.name, emailEdit: currentUser.email };

  const { values, handleChangeInput, resetFrom, errors, isValid, isValidInputs, isRepeatError } = useFormAndValidation(defaultValues);

  const handleSubmit = (e) => {    
    e.preventDefault();
    let { nameEdit, emailEdit } = values;    
    if (nameEdit === undefined) nameEdit = currentUser.name;
    if (emailEdit === undefined) emailEdit = currentUser.email;
    const newInfo = { name: nameEdit, email: emailEdit }
    onUpdateUser(newInfo);
    resetFrom();
  };

  return (
    <>
      <Header activeLink='profile' />
      <main className='profile-block'>
        <section className='profile'>
          <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
          <form className='profile__form' name='profileEditForm' onSubmit={handleSubmit}>
            <div className='profile__field'>
            <label
              htmlFor='nameEdit'
              className='profile__label profile__label_type_name'
            >
              Имя
            </label>
            <input
              className='profile__input profile__input_type_name'
              type='text'
              pattern='^[а-яА-ЯёЁa-zA-Z\- ]+$'
              name='nameEdit'
              id='nameEdit'
              minLength='2'
              maxLength='30'
              defaultValue={currentUser.name}
              onChange={handleChangeInput}
              required
              disabled={isRequestingServer}
            />
            <Error className='profile-form-input__error profile-form-input__error__name'
          id='edit-input-name-error'
          text={errors.nameEdit} />
            </div>
            <div className='profile__field'>
            <label
              htmlFor='emailEdit'
              className='profile__label profile__label_type_email'
            >
              E-mail
            </label>
            <input
              className={
                isValidInputs?.emailEdit ||
                !isValidInputs.hasOwnProperty('emailEdit')
                  ? 'profile__input'
                  : 'profile__input profile__input_error'
              }
              type='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              name='emailEdit'
              id='emailEdit'
              defaultValue={currentUser.email}
              onChange={handleChangeInput}
              required
              disabled={isRequestingServer}
            />
            <Error className='profile-form-input__error profile-form-input__error_email'
          id='edit-input-email-error'
          text={errors.emailEdit} />
            </div>
            <Error
          className='profile-form__error'
          id={`submit-profile-form-error`}
          text={isRepeatError ? 'Данные не были изменены' : serverResponseUserUpdateText || ''}
        />
            <button className={isRequestingServer || !isValid ? 'profile__button profile__button_disabled' : 'profile__button'} type='submit' disabled={isRequestingServer || !isValid}>
              Редактировать
            </button>
          </form>
          <Link to='/' className='profile__link' onClick={onLogOut}>
            Выйти из аккаунта
          </Link>
        </section>
      </main>
    </>
  );
}

export default Profile;
