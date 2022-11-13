import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            target='_blank'
            href='https://mistersviter.github.io/russian-travel'
          >
            <p className='portfolio__link-text'>Статичный сайт</p>
            <p className='portfolio__link-text_arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            target='_blank'
            href='https://mistersviter.github.io/mesto'
          >
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <p className='portfolio__link-text_arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            target='_blank'
            href='https://sviter.nomoredomains.sbs'
          >
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            <p className='portfolio__link-text_arrow'>↗</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
