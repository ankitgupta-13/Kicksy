import { useState } from 'react';
import style from './FilterSidebar.module.css';
import { Button, Input } from '../index';


const FilterSidebar = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState();
  const [wActive, setWActive] = useState();
  const [currentFilters, setCurrentFilters] = useState([]);
  // const [currentFilters2, setCurrentFilters2] = useState("None");

  const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
  const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
  const sizeOptions = ['S', 'M', 'L'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];


  const handleGenderButtonClick = (gender) => {
    const genderFilterName = 'gender';
    if (gender === 'M') {
      setMActive(!mActive);
      onFilterChange(genderFilterName, mActive ? [] : [gender]);
      // setCurrentFilters2(mActive ? "" : "Men");
      setCurrentFilters(mActive ? currentFilters.filter(filter => filter !== 'Men') : [...currentFilters, 'Men']);
    } else if (gender === 'F') {
      setWActive(!wActive);
      onFilterChange(genderFilterName, wActive ? [] : [gender]);
      // setCurrentFilters2(wActive ? "" : "Women");
      setCurrentFilters(wActive ? currentFilters.filter(filter => filter !== 'Women') : [...currentFilters, 'Women']);
    }
  };

  // const handleCheckboxChange = (filterName, value) => {
  //   const currentFiltersCopy = [...currentFilters];

  //   if (currentFiltersCopy.includes(value)) {
  //     const updatedFilters = currentFiltersCopy.filter((filter) => filter !== value);
  //     onFilterChange(filterName, updatedFilters);
  //     setCurrentFilters(currentFiltersCopy.filter((filter) => filter !== value));
  //   } else {
  //     const updatedFilters = [...currentFiltersCopy, `${filterName}: ${value}`];
  //     onFilterChange(filterName, updatedFilters);
  //     setCurrentFilters(updatedFilters);
  //   }
  // };

  const handleCheckboxChange = (filterName, value) => {
    const currentFiltersCopy = [...currentFilters];
  
    if (currentFiltersCopy.includes(`${filterName}: ${value}`)) {
      const updatedFilters = currentFiltersCopy.filter((filter) => filter !== `${filterName}: ${value}`);
      onFilterChange(filterName, updatedFilters);
      setCurrentFilters(updatedFilters);
    } else {
      const updatedFilters = [...currentFiltersCopy, `${filterName}: ${value}`];
      onFilterChange(filterName, updatedFilters);
      setCurrentFilters(updatedFilters);
    }
  };

  return (
    <div className={style.filtersidebar}>
      <div className={style.CurrentFiltersContainer}>
        <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
        <div>{currentFilters.map((filter) =>
          <p key={filter}>{filter}</p>
        )}</div>
        <p onClick={() => setCurrentFilters([])} style={{ cursor: 'pointer', display: currentFilters.length === 0 ? 'none' : 'inline-block', width: "max-content" }}>Clear All</p>
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
      ].map(({ filterName, options }) => (
        <div className={style.FilterNameContainer} key={filterName}>
          <label className={style.FilterName}>{filterName}:</label>
          <div>
            {options.map((option) => (
              <Input
                key={option}
                padding="5px"
                margin="5px"
                style={{ height: '20px', width: '20px', marginRight: '10px', }}
                type="checkbox"
                labelcheckbox={option}
                onChange={() => handleCheckboxChange(filterName, option)}
                checked={filters[filterName]?.includes(option) || false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;



// import { useState } from 'react';
// import style from './FilterSidebar.module.css';
// import { Button, Input } from '../index';


// const FilterSidebar = ({ filters, onFilterChange }) => {
//   const [mActive, setMActive] = useState();
//   const [wActive, setWActive] = useState();
//   const [currentFilters, setCurrentFilters] = useState(
//     {
//       gender: [],
//       category: [],
//       brand: [],
//       size: [],
//       colors: []
//     }
//   );

//   const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
//   const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
//   const sizeOptions = ['S', 'M', 'L'];
//   const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];


//   const handleGenderButtonClick = (gender) => {
//     const genderFilterName = 'gender';
//     if (gender === 'M') {
//       setMActive(!mActive);
//       onFilterChange(genderFilterName, mActive ? [] : [gender]);
//       // setCurrentFilters2(mActive ? "" : "Men");
//       setCurrentFilters(mActive ? currentFilters.filter(filter => filter !== 'Men') : [...currentFilters, 'Men']);
//     } else if (gender === 'F') {
//       setWActive(!wActive);
//       onFilterChange(genderFilterName, wActive ? [] : [gender]);
//       // setCurrentFilters2(wActive ? "" : "Women");
//       setCurrentFilters(wActive ? currentFilters.filter(filter => filter !== 'Women') : [...currentFilters, 'Women']);
//     }
//   };


//   const handleCheckboxChange = (filterName, value) => {
//     const currentFiltersCopy = [...currentFilters];

//     if (currentFiltersCopy.includes(value)) {
//       const updatedFilters = currentFiltersCopy.filter((filter) => filter !== value);
//       onFilterChange(filterName, updatedFilters);
//       setCurrentFilters(currentFiltersCopy.filter((filter) => filter !== value));
//     } else {
//       const updatedFilters = [...currentFiltersCopy, `${filterName}: ${value}`];
//       onFilterChange(filterName, updatedFilters);
//       setCurrentFilters(
//         ...currentFilters,
//         {[filterName]: value}
//       );
//       console.log(currentFilters);
      
//     }
//   };

//   return (
//     <div className={style.filtersidebar}>
//       <div className={style.CurrentFiltersContainer}>
//         <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
//         <div>
//           {currentFilters.category.map((category, index) => (
//             <p key={index}>{category}</p>
//           ))}
//         </div>
//         <p onClick={() => setCurrentFilters([])} style={{ cursor: 'pointer', display: currentFilters.length === 0 ? 'none' : 'inline-block', width: "max-content" }}>Clear All</p>
//       </div>
//       <div className={style.BodyTypeContainer}>
//         <label className={style.BodyType}>Body Type:</label>
//         <div className={style.buttons}>
//           <Button
//             className={style.Button}
//             style={{ backgroundColor: mActive ? 'black' : 'white', color: mActive ? 'white' : 'black', width: '80px' }}
//             onClick={() => handleGenderButtonClick('M')}
//           >
//             Men
//           </Button>
//           <Button
//             className={style.Button}
//             style={{ backgroundColor: wActive ? 'black' : 'white', color: wActive ? 'white' : 'black', width: '80px' }}
//             onClick={() => handleGenderButtonClick('F')}
//           >
//             Women
//           </Button>
//         </div>
//       </div>


//       {[
//         { filterName: 'category', options: productTypeOptions },
//         { filterName: 'brand', options: brandOptions },
//         { filterName: 'size', options: sizeOptions },
//         { filterName: 'colors', options: colorOptions },
//       ].map(({ filterName, options }) => (
//         <div className={style.FilterNameContainer} key={filterName}>
//           <label className={style.FilterName}>{filterName}:</label>
//           <div>
//             {options.map((option) => (
//               <Input
//                 key={option}
//                 padding="5px"
//                 margin="5px"
//                 style={{ height: '20px', width: '20px', marginRight: '10px', }}
//                 type="checkbox"
//                 labelcheckbox={option}
//                 onChange={() => handleCheckboxChange(filterName, option)}
//                 checked={filters[filterName]?.includes(option) || false}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterSidebar;


// import { useState } from 'react';
// import style from './FilterSidebar.module.css';
// import { Button, Input } from '../index';
// import CloseIcon from '@mui/icons-material/Close';

// const FilterSidebar = ({ filters, onFilterChange }) => {
//   const [mActive, setMActive] = useState(false);
//   const [wActive, setWActive] = useState(false);
//   const [currentGenderFilter, setCurrentGenderFilter] = useState([]);
//   const [currentCategoryFilters, setCurrentCategoryFilters] = useState([]);
//   const [currentBrandFilters, setCurrentBrandFilters] = useState([]);
//   // Add more state variables for other types of filters as needed

//   const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
//   const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
//   // Define options for other types of filters as needed

//   const handleCheckboxChange = (filterName, value: string) => {
//     const currentFilters = filters[filterName] || [];
//     const currentFiltersCopy = [...currentFilters];

//     if (currentFilters.includes(value)) {
//       const updatedFilters = currentFilters.filter((filter) => filter !== value);
//       onFilterChange(filterName, updatedFilters);
//       setCurrentFilters(currentFiltersCopy.filter((filter) => filter !== value));
//     }
//     else {
//       const updatedFilters = [...currentFilters, value];
//       onFilterChange(filterName, updatedFilters);
//     }

//     // Update current filters state based on filter type
//     switch (filterName) {
//       case 'category':
//         if (currentCategoryFilters.includes(value)) {
//           onFilterChange(filterName, setCurrentCategoryFilters(currentFiltersCopy.filter((filter) => filter != value)));
//         }
//         else {
//           onFilterChange(filterName, setCurrentCategoryFilters(currentFilters => [...currentFilters, value]));
//         }
//         break;
//       case 'brand':
//         if (currentBrandFilters.includes(value)) {
//           onFilterChange(filterName, setCurrentBrandFilters(currentFiltersCopy.filter((filter) => filter != value)));
//         }
//         else {
//           onFilterChange(filterName, setCurrentBrandFilters(currentFilters => [...currentFilters, value]));
//         }
//         break;
//       // Add cases for other types of filters as needed
//       default:
//         break;
//     }
//   };

//   const handleGenderButtonClick = (gender) => {
//     const genderFilterName = 'gender';
//     if (gender === 'M') {
//       setMActive(!mActive);
//       onFilterChange(genderFilterName, mActive ? [] : [gender]);
//       setCurrentGenderFilter(mActive ? "" : "Men");
//     } else if (gender === 'F') {
//       setWActive(!wActive);
//       onFilterChange(genderFilterName, wActive ? [] : [gender]);
//       setCurrentGenderFilter(wActive ? "" : "Women");
//     }
//   };

//   return (
//     <div className={style.filtersidebar}>
//       <div className={style.CurrentFiltersContainer}>
//         <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
//         {currentGenderFilter && <p>{currentGenderFilter}</p>}
//         {currentCategoryFilters && <p>{currentCategoryFilters.map((category) => (
//           <span key={category}> {category}, </span>
//         ))
//         }</p>}
//         {currentBrandFilters && <p>{currentBrandFilters.map((brand) => (
//           <span key={brand}> {brand}, </span>
//         ))
//         }</p>}
//         {/* Render current filters for other types of filters as needed */}
//       </div>
//       <div className={style.BodyTypeContainer}>
//         <label className={style.BodyType}>Body Type:</label>
//         <div className={style.buttons}>
//           <Button
//             className={style.Button}
//             style={{ backgroundColor: mActive ? 'black' : 'white', color: mActive ? 'white' : 'black', width: '80px' }}
//             onClick={() => handleGenderButtonClick('M')}
//           >
//             Men
//           </Button>
//           <Button
//             className={style.Button}
//             style={{ backgroundColor: wActive ? 'black' : 'white', color: wActive ? 'white' : 'black', width: '80px' }}
//             onClick={() => handleGenderButtonClick('F')}
//           >
//             Women
//           </Button>
//         </div>
//       </div>

//       {[
//         { filterName: 'category', options: productTypeOptions },
//         { filterName: 'brand', options: brandOptions },
//         // Add more filter types as needed
//       ].map(({ filterName, options }) => (
//         <div className={style.FilterNameContainer} key={filterName}>
//           <label className={style.FilterName}>{filterName}:</label>
//           <div>
//             {options.map((option) => (
//               <Input
//                 key={option}
//                 padding="5px"
//                 margin="5px"
//                 style={{ height: '20px', width: '20px', marginRight: '10px' }}
//                 type="checkbox"
//                 labelcheckbox={option}
//                 onChange={() => handleCheckboxChange(filterName, option)}
//                 checked={filters[filterName]?.includes(option) || false}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterSidebar;
