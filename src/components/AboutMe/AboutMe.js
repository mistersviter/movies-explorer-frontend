import React from 'react';
import './AboutMe.css';
import Section from '../Section/Section';
import me from '../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <Section
      sectionTitle='Студент'
      classSection='about-me'
      classSectionTitle='about-me__title'
    >
      <article className='about-me__biography'>
        <div className='about-me__info-block'>
          <h3 className='about-me__header'>Евгений</h3>
          <p className='about-me__subheader'>Фронтенд-разработчик, 32 года</p>
          <p className='about-me__text'>
            Я живу в России, в г. Самара. Закончил СГАУ имени академика С.П.
            Королева в 2013 году. C того же года начал работу в АО «ГК
            "Электрощит"». С 01.01.2022 перевелся на должность
            инженер-программист, где работаю по сей день. Развиваюсь в области
            веб-разработки и планирую полный переход в эту область в ближайшем
            будущем.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/mistersviter'
            rel='noreferrer'
            target={'_blank'}
          >
            Github
          </a>
        </div>
        <img className='about-me__picture' src={me} alt='Фото' />
      </article>
      <Portfolio />
    </Section>
  );
};

export default AboutMe;
