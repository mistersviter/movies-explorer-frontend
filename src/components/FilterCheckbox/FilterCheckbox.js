import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const {
    onCheckShortMovies,
    isShortMoviesChecked,
    isShortMoviesInSaveChecked,
    type,
  } = props;

  function handleChangeSwitchState(evt) {
    onCheckShortMovies(evt.target.checked, type);
  }

  const isChecked =
    type === 'default' ? isShortMoviesChecked : isShortMoviesInSaveChecked;

  return (
    <div className='filter'>
      <label className='filter__switch'>
        <input
          type='checkbox'
          className='filter__checkbox'
          onChange={handleChangeSwitchState}
          checked={isChecked}
        />
        <div className='filter__switch-slider'></div>
      </label>
      <label htmlFor='filter__checkbox' className='filter__label'>
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
