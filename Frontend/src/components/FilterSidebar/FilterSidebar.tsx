import React, { useState } from 'react';
import style from './FilterSidebar.module.css'
import { Button } from '..';

interface FilterSidebarProps {
  filters: Record<string, string>;
  onFilterChange: (filterName: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState(false);
  const [wActive, setWActive] = useState(false);
  return (
    <div className={style.filtersidebar}>
      <h2>Current Filters</h2>
      <div>

      </div>
      <label>Body Type:</label>
      <div className={style.buttons}>
        <Button
        style={{ backgroundColor: mActive ? "black" :"white",color: mActive ? "white" :"black"  }}
        onClick={()=>setMActive(mActive? false : true)}
        >
          Men
        </Button>
        <Button
          style={{ backgroundColor: wActive ? "black" :"white",color: wActive ? "white" :"black" }}
          onClick={()=>setWActive(wActive? false : true)}
        >
          Women
        </Button>

      </div>
      <label>Product Type:</label>
      <div>
        
      </div>
      <label>Brand:</label>
      <div>
        
      </div>
      <label>Size:</label>
      <div>
        
      </div>
      <label>Color:</label>
      <div>
        
      </div>
      
    </div>
  );
};

export default FilterSidebar;