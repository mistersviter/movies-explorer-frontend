import './AboutMe.css';
import React from 'react';
import Section from '../Section/Section';
import photoStudent from '../../images/photo-student.jpg';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <Section
      sectionTitle={'Студент'}
      classSection={'about-me'}
      classSectionTitle={'about-me__title'}
      sectionId={'about-me'}
    >
      <article>
        <header>
          <h3>Евгений</h3>
        </header>
        <p>
          История о том, как возле столовой появились загадочные розовые следы с
          шестью пальцами, и почему это случилось.
        </p>
      </article>
      <figure className={'about-me__block'}>
        <figcaption className={'about-me__signature'}>
          <blockquote className='about-me__citation'>
            <cite className='about-me__quote-author'>Тарабрин Евгений</cite>
            <p className='about-me__quote-subline'>
              Фронтенд-разработчик, 24 года
            </p>
            <p className='about-me__quote'>
              Я родился и живу в Екатеринбурге, закончил факультет спортивного
              менеджмента РГППУ. Я занимаюсь BJJ и силовым экстримом в Академии
              единоборств РМК. Начал кодить чуть больше года назад. С 2019 года
              работаю в компании «ТоргМастер» администратором сайтов. Активно
              развиваюсь в направлении веб-разработки, изучаю React, TypeScript.
              В дальнейшем планирую попробовать себя в Mobile App Development.
            </p>
          </blockquote>
          <SocialList type={'about-me'} sliceItem={1} />
        </figcaption>
        <div className={'about-me__container-img'}>
          <img
            className={'about-me__avatar'}
            src={photoStudent}
            alt={'Фотография студента.'}
          />
        </div>
      </figure>

      <Portfolio />
    </Section>
  );
};

export default AboutMe;
