import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  const {
    onSearchMovies,
    onSearchInSavedMovies,
    onChangeSearchValue,
    onCheckShortMovies,
    searchValue,
    searchValueInSaved,
    isShortMoviesChecked,
    isShortMoviesInSaveChecked,
    type,
  } = props;

  function handleSearchChange(evt) {
    onChangeSearchValue(evt.target.value, type);
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    if (type === 'default') onSearchMovies(searchValue, isShortMoviesChecked);
    else onSearchInSavedMovies(searchValueInSaved, isShortMoviesInSaveChecked);
  }

  const value = type === 'default' ? searchValue : searchValueInSaved;

  return (
    <section className='search'>
      <div className='search__wrapper'>
        <form className='search__form' onSubmit={handleSearchMovies}>
          <div className='search__form-wrapper'>
            <div className='search__pic'></div>
            <input
              type='text'
              placeholder='Фильм'
              className='search__input-text'
              onChange={handleSearchChange}
              value={value}
            />
            <button
              type='submit'
              aria-label='Поиск'
              className='search__submit-btn'
            ></button>
            <span className='search__separator'></span>
          </div>
          <FilterCheckbox
            type={type}
            onCheckShortMovies={onCheckShortMovies}
            isShortMoviesChecked={isShortMoviesChecked}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
