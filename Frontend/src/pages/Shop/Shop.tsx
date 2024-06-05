// import React, { useState, useEffect } from "react";
// import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
// import { getAllProducts } from "../../api/user.api";
// import style from "./Shop.module.css";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import ImageSliderPrev from "../../components/ImageSliderPrev/ImageSliderPrev";
// import { useLocation } from 'react-router-dom';
// import banner from "../../assets/menbanner.png";
// import { Button } from "@mui/material";

// import TuneIcon from '@mui/icons-material/Tune';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import MediaQuery from "react-responsive";
// import axios from 'axios';
// import { current } from "@reduxjs/toolkit";


// const Shop: React.FC = () => {
//   const [mActives, setmActives] = useState();
//   const [wActives, setwActives] = useState();
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const location = useLocation();
//   const cleanstring = location.search.substring(1);
//   const [key, value] = cleanstring.split('=');
//   const [filters, setFilters] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState<any[]>([]);


//   useEffect(() => {
//     // const fetchAllProducts = async () => {
//     //   {
//     //     value && setFilters((prevFilters) => ({
//     //       ...prevFilters,
//     //       [key]: [value],
//     //     }));
//     //   }
//     //   const data = await getAllProducts();
//     //   setAllProducts(data.data.products);
//     // };
//     const filterProducts = async (currentFilters: string[]) => {
//       try {
//         const response = await axios.post('http://localhost:3000/api/products/filter-product', { filters: currentFilters });
//         console.log(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     // fetchAllProducts();
//     filterProducts(filters)
//     scrollTo(0, 0);
//   }, []);

//   // useEffect(() => {
//   //   const filterProducts = () => {
//   //     let filteredResult = [...allProducts];
//   //     Object.keys(filters).forEach((filterName) => {
//   //       const filterValues = filters[filterName];
//   //       if (filterValues && filterValues.length > 0) {
//   //         filteredResult = filteredResult.filter((product) => {
//   //           const productValues = product[filterName] || [];
//   //           return filterValues.every((filterValue) =>
//   //             productValues?.includes(filterValue)
//   //           );
//   //         });
//   //       }
//   //     });
//   //     setFilteredProducts(filteredResult);
//   //   };
//   //   filterProducts();
//   // }, [filters, allProducts]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 430) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//   }, []);

//   const handleFilterChange = (value: string) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       value,
//     }));
//   };

//   const handleGenderButtonClick = (gender: string) => {
//     const genderFilterName = 'gender';
//     if (gender === 'M') {
//       setmActives(!mActives);
//       onFilterChange(genderFilterName, mActives ? [] : [gender]);
//     } else if (gender === 'F') {
//       setwActives(!wActives);
//       onFilterChange(genderFilterName, wActives ? [] : [gender]);
//     }
//   };

//   const handleFilterSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   }

//   return (
//     <>
//       {/* {value && 
//     <div>
//     <img src={banner} alt="banner"/>
//     </div>} */}
//       <div className={style.shoppage}>
//         <div className={style.filtersidebar} style={{ display: sidebarOpen ? "block" : "none" }}>
//           <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
//         </div>
//         <div className={style.filterbar}>
//           <div className={style.topbuttons}>
//             <Button
//               className={style.Button}
//               style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: mActives ? 'black' : 'white', color: mActives ? 'white' : 'black', width: '80px' }}
//               onClick={() => handleGenderButtonClick('M')}
//             >
//               Men
//             </Button>
//             <Button
//               className={style.Button}
//               style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: wActives ? 'black' : 'white', color: wActives ? 'white' : 'black', width: '80px' }}
//               onClick={() => handleGenderButtonClick('F')}
//             >
//               Women
//             </Button>
//             <Button
//               className={style.Button}
//               style={{ backgroundColor: sidebarOpen ? 'white' : '#f0f0f0', color: 'black', width: '80px', border: sidebarOpen ? 'none' : '1px solid black', right: sidebarOpen ? '-11px' : '' }}
//               onClick={() => handleFilterSidebar()}
//             >
//               {sidebarOpen ? <CloseOutlinedIcon /> : <TuneIcon />}
//             </Button>
//           </div>
//         </div>
//         <div className={style.productlist}>
//           {filteredProducts?.map((product: any, index: number) => (
//             <div className={style.listitem} key={index}>
//               <MediaQuery minWidth={430}>
//                 <ProductCard product={product} />
//               </MediaQuery>

//               <MediaQuery maxWidth={430}>
//                 <ProductCard product={product} wid="45vw" />
//               </MediaQuery>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Shop;



























import React, { useState, useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import style from "./Shop.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLocation } from 'react-router-dom';
import banner from "../../assets/menbanner.png";
import { Button } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MediaQuery from "react-responsive";
import axios from 'axios';

const Shop: React.FC = () => {
  const [mActives, setmActives] = useState(false);
  const [wActives, setwActives] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const cleanstring = location.search.substring(1);
  const [key, value] = cleanstring.split('=');
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const fetchFilteredProducts = async (currentFilters: string[]) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products/filter-product', { filters: currentFilters });
      console.log(response.data);
      setFilteredProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    fetchFilteredProducts(filters);
  }, [filters]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 430) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (newFilters: string[]) => {
    setFilters(newFilters);
  };

  const handleGenderButtonClick = (gender: string) => {
    const genderFilterValue = gender === 'M' ? 'Men' : 'Women';
    if (gender === 'M') {
      setmActives(!mActives);
      handleFilterChange(mActives ? filters.filter(filter => filter !== 'Men') : [...filters, 'Men']);
    } else if (gender === 'F') {
      setwActives(!wActives);
      handleFilterChange(wActives ? filters.filter(filter => filter !== 'Women') : [...filters, 'Women']);
    }
  };

  const handleFilterSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className={style.shoppage}>
        <div className={style.filtersidebar} style={{ display: sidebarOpen ? "block" : "none" }}>
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className={style.filterbar}>
          <div className={style.topbuttons}>
            <Button
              className={style.Button}
              style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: mActives ? 'black' : 'white', color: mActives ? 'white' : 'black', width: '80px' }}
              onClick={() => handleGenderButtonClick('M')}
            >
              Men
            </Button>
            <Button
              className={style.Button}
              style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: wActives ? 'black' : 'white', color: wActives ? 'white' : 'black', width: '80px' }}
              onClick={() => handleGenderButtonClick('F')}
            >
              Women
            </Button>
            <Button
              className={style.Button}
              style={{ backgroundColor: sidebarOpen ? 'white' : '#f0f0f0', color: 'black', width: '80px', border: sidebarOpen ? 'none' : '1px solid black', right: sidebarOpen ? '-11px' : '' }}
              onClick={() => handleFilterSidebar()}
            >
              {sidebarOpen ? <CloseOutlinedIcon /> : <TuneIcon />}
            </Button>
          </div>
        </div>
        <div className={style.productlist}>
          {filteredProducts.map((product: any, index: number) => (
            <div className={style.listitem} key={index}>
              <MediaQuery minWidth={430}>
                <ProductCard product={product} />
              </MediaQuery>

              <MediaQuery maxWidth={430}>
                <ProductCard product={product} wid="45vw" />
              </MediaQuery>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
