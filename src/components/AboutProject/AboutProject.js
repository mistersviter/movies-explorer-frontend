import './AboutProject.css';
import React from 'react';
import Section from '../Section/Section';

const AboutProject = () => {
  return (
    <Section
      sectionTitle='О проекте'
      classSection='about-project'
      classSectionTitle='about-project__title'
      sectionId='about-project'
    >
      <div className='about-project__text-content'>
        <div className='about-project__text-unit'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className='about-project__text-unit'>
          <h3 className='about-project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__timings'>
        <div className='about-project__timing-bar'>
          <p className='about-project__timing about-project__backend-timing'>
            1 неделя
          </p>
          <p className='about-project__timing about-project__frontend-timing'>
            4 недели
          </p>
        </div>
        <div className='about-project__timing-captions'>
          <p className='about-project__timing-caption about-project__backend-caption'>
            Back-end
          </p>
          <p className='about-project__timing-caption about-project__frontend-caption'>
            Front-end
          </p>
        </div>
      </div>
    </Section>
  );
};

export default AboutProject;
