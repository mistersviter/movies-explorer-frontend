import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { tempMovies } from '../../utils/constants';
import { useState, useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function MoviesCardList(props) {
  const { width } = useWindowDimensions();
  const [elementLimit, setElemenLimit] = useState(5);

  useEffect(() => {
    if (width > 1296) setElemenLimit(12);
    if (width <= 1296 && width > 600) setElemenLimit(8);
    if (width <= 600) setElemenLimit(5);
  }, [width]);

  return (
    <section className='movies'>
      <ul className='movies__list'>
        {tempMovies.map((movie, index) => {
          if (index < elementLimit) {
            return (
              <li className='movies__item' key={movie.id}>
                <MoviesCard key={movie.id} movie={movie} type={props.type} />
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className='movies__btn-wrapper'>
        <button
          className='movies__more-btn'
          type='button'
          aria-label='Показать ещё фильмы'
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
