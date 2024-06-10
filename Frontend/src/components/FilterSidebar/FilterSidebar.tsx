import { useState } from 'react';
import style from './FilterSidebar.module.css';
import { Button, Input } from '../index';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState(filters.includes('M'));
  const [wActive, setWActive] = useState(filters.includes('W'));
  const [kActive, setKActive] = useState(filters.includes('K'));

  const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
  const brandOptions = ['Anime','Dr. Martens', 'Nike', 'Adidas', 'Jordan'];
  const sizeOptions = ['6','7','8','9','10','11','12'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

  const handleGenderButtonClick = (gender) => {
    let newFilters;
    if (gender === 'M') {
      setMActive(!mActive);
      newFilters = mActive ? filters.filter(filter => filter !== 'M') : [...filters, 'M'];
    } else if (gender === 'F') {
      setWActive(!wActive);
      newFilters = wActive ? filters.filter(filter => filter !== 'F') : [...filters, 'F'];
    } else if (gender === 'K') {
      setKActive(!kActive);
      newFilters = kActive ? filters.filter(filter => filter !== 'K') : [...filters, 'K'];
    }
    
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (value) => {
    let currentFiltersCopy = [...filters];
    const filterIndex = currentFiltersCopy.indexOf(value);

    if (filterIndex > -1) {
      currentFiltersCopy.splice(filterIndex, 1);
    } else {
      currentFiltersCopy = [...filters, value];
    }
    onFilterChange(currentFiltersCopy);
  };

  return (
    <div className={style.filtersidebar}>
      <div className={style.CurrentFiltersContainer}>
        <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
        <div>{filters.map((filter, index) => <p key={index}>{filter}</p>)}</div>
        <p onClick={() => {onFilterChange([]); setMActive(false); setWActive(false); setKActive(false)}} style={{ cursor: 'pointer', display: filters.length === 0 ? 'none' : 'inline-block', width: "max-content" }}>Clear All</p>
      </div>
      <div className={style.BodyTypeContainer}>
        <label className={style.BodyType}>Body Type:</label>
        <div className={style.buttons}>
          <Button
            className={style.Button}
            style={{ backgroundColor: mActive ? 'black' : 'white', color: mActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('M')}
          >
            Men
          </Button>
          <Button
            className={style.Button}
            style={{ backgroundColor: wActive ? 'black' : 'white', color: wActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('F')}
          >
            Women
          </Button>
          <Button
            className={style.Button}
            style={{ backgroundColor: kActive ? 'black' : 'white', color: kActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('K')}
          >
            Kids
          </Button>
        </div>
      </div>

      {[
        { filterName: 'category', options: productTypeOptions },
        { filterName: 'brand', options: brandOptions },
        { filterName: 'size', options: sizeOptions },
        { filterName: 'color', options: colorOptions },
      ].map(({ filterName, options }) => (
        <div className={style.FilterNameContainer} key={filterName}>
          <label className={style.FilterName}>{filterName}:</label>
          <div>
            {options.map((option) => (
              <Input
                key={option}
                padding="5px"
                margin="5px"
                style={{ height: '20px', width: '20px', marginRight: '10px' }}
                type={"checkbox"}
                labelcheckbox={option}
                onChange={() => handleCheckboxChange(option)}
                checked={filters.includes(option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;