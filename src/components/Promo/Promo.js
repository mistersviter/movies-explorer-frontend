import React from 'react';
import './Promo.css';
import earth from '../../images/earth.png';
import NavTab from '../NavTab/NavTab';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <img className='promo__picture' src={earth} alt='Планета'></img>
        <button className='promo__button'>Узнать больше</button>
      </div>
    </section>
  );
};

export default Promo;
