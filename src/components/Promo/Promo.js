import React from 'react';
import './Promo.css';
import earth from '../../images/earth.png';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб‑разработки.
        </h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <img className='promo__picture' src={earth} alt='Планета'></img>
        <a className='promo__link' href='#about-project'>
          Узнать больше
        </a>
      </div>
    </section>
  );
};

export default Promo;
