import './MoviesCard.css';

function MoviesCard(props) {
  const { movie, onSaveMovie, onDeleteMovie, type } = props;

  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) return `${hours}ч ${minutes}м`;
    else return `${minutes}м`;
  };

  const getMovieThumbnail = () => {
    if (type === 'default')
      return `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    else return movie.thumbnail;
  };

  const movieThumbnail = getMovieThumbnail();

  const handleOpenYouTube = () => {
    window.open(movie.trailerLink);
  };

  const toggleSaveMovie = () => {
    if (movie.isSaved) {
      onDeleteMovie(type === 'default' ? movie._id : movie.id);
    } else {
      onSaveMovie(movie, movieThumbnail);
    }
  };

  const handleDeleteMovie = () => {
    onDeleteMovie(type === 'default' ? movie.id : movie._id);
  };

  return (
    <li className='movies__item'>
      <article className='movie'>
        <img
          className='movie__img'
          alt='Превью фильма'
          src={movieThumbnail}
          onClick={handleOpenYouTube}
        />
        <h2 className='movie__title'>{props.movie.nameRU}</h2>
        <p className='movie__duration'>
          {getMovieDuration(props.movie.duration)}
        </p>
        {props.type === 'default' ? (
          <button
            className={
              movie.isSaved
                ? 'movie__button-save movie__button-save_active'
                : 'movie__button-save'
            }
            type='button'
            aria-label='Сохранить фильм'
            onClick={toggleSaveMovie}
          />
        ) : (
          <button
            className='movie__button-delete'
            type='button'
            aria-label='Удалить фильм'
            onClick={handleDeleteMovie}
          />
        )}
      </article>
    </li>
  );
}

export default MoviesCard;
