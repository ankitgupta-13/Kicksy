import React, { useState } from 'react';
import style from './FilterSidebar.module.css';
import { Button, Input } from '../index';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState(false);
  const [wActive, setWActive] = useState(false);
  const [currentFilters, setCurrentFilters] = useState([]);

  const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
  const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
  const sizeOptions = ['6', '7', '8', '9', '10', '11', '12'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

  const handleGenderButtonClick = (gender) => {
    const genderFilterValue = gender === 'M' ? 'Men' : 'Women';
    if (gender === 'M') {
      setMActive(!mActive);
      setCurrentFilters(mActive ? currentFilters.filter(filter => filter !== 'Men') : [...currentFilters, 'Men']);
    } else if (gender === 'F') {
      setWActive(!wActive);
      setCurrentFilters(wActive ? currentFilters.filter(filter => filter !== 'Women') : [...currentFilters, 'Women']);
    }
    onFilterChange(mActive || wActive ? currentFilters : [...currentFilters, genderFilterValue]);
  };

  const handleCheckboxChange = (filterValue) => {
    const currentFiltersCopy = [...currentFilters];
    if (currentFiltersCopy.includes(filterValue)) {
      const updatedFilters = currentFiltersCopy.filter((filter) => filter !== filterValue);
      setCurrentFilters(updatedFilters);
      onFilterChange(updatedFilters);
    } else {
      const updatedFilters = [...currentFiltersCopy, filterValue];
      setCurrentFilters(updatedFilters);
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className={style.filtersidebar}>
      <div className={style.CurrentFiltersContainer}>
        <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
        <div>{currentFilters.map((filter) =>
          <p key={filter}>{filter}</p>
        )}</div>
        <p onClick={() => {
          setCurrentFilters([]);
          onFilterChange([]);
        }} style={{ cursor: 'pointer', display: currentFilters.length === 0 ? 'none' : 'inline-block', width: "max-content" }}>Clear All</p>
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
        </div>
      </div>

      {[
        { filterName: 'category', options: productTypeOptions },
        { filterName: 'brand', options: brandOptions },
        { filterName: 'size', options: sizeOptions },
        { filterName: 'colors', options: colorOptions },
      ].map(({ options }) => (
        <div className={style.FilterNameContainer} key={options.join(',')}>
          <label className={style.FilterName}>{options[0]}:</label>
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
                checked={currentFilters.includes(option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
