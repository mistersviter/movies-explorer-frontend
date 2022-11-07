import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__info-block'>
        <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
        <nav>
          <ul className='footer__links'>
            <li>
              <a
                href='https://praktikum.yandex.ru'
                className='footer__link'
                rel='noreferrer'
                target='_blank'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href='https://github.com/mistersviter'
                className='footer__link'
                rel='noreferrer'
                target='_blank'
              >
                Github
              </a>
            </li>
            <li>
              <a
                href='https://t.me/ETarabrin'
                className='footer__link'
                rel='noreferrer'
                target='_blank'
              >
                Telegram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
