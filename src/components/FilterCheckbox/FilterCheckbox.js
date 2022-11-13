import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter'>
      <label className='filter__switch'>
        <input type='checkbox' className='filter__checkbox' defaultChecked />
        <div className='filter__switch-slider'></div>
      </label>
      <label htmlFor='filter__checkbox' className='filter__label'>
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
