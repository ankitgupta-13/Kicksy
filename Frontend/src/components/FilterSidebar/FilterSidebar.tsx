import React from 'react';
import style from './FilterSidebar.module.css'

interface FilterSidebarProps {
  filters: Record<string, string>;
  onFilterChange: (filterName: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className={style.filtersidebar}>
      <h2>Filter Options</h2>
      <label>Body Type:</label>
      <input
        type="text"
        value={filters.bodyType}
        onChange={(e) => onFilterChange('bodyType', e.target.value)}
      />
    </div>
  );
};

export default FilterSidebar;