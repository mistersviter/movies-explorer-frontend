import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);

  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) return `${hours}ч ${minutes}м`;
    else return `${minutes}м`;
  };

  const getMovieThumbnail = (path) => {
    return `https://api.nomoreparties.co${path}`;
  };

  const handleClickSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <article className='movie'>
      <img
        className='movie__img'
        alt='Превью фильма'
        src={getMovieThumbnail(props.movie.image.formats.thumbnail.url)}
      />
      <h2 className='movie__title'>{props.movie.nameRU}</h2>
      <p className='movie__duration'>
        {getMovieDuration(props.movie.duration)}
      </p>
      {props.type === 'default' ? (
        <button
          className={
            isSaved
              ? 'movie__button-save movie__button-save_active'
              : 'movie__button-save'
          }
          type='button'
          aria-label='Сохранить фильм'
          onClick={handleClickSave}
        />
      ) : (
        <button
          className='movie__button-delete'
          type='button'
          aria-label='Удалить фильм'
        />
      )}
    </article>
  );
}

export default MoviesCard;
