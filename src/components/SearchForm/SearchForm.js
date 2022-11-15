import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <div className='search__wrapper'>
        <form className='search__form'>
          <div className='search__pic'></div>
          <input
            type='text'
            placeholder='Фильм'
            className='search__input-text'
          />
          <button
            type='submit'
            aria-label='Поиск'
            className='search__submit-btn'
          ></button>
          <span className='search__separator'></span>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
