import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { getAllProducts } from '../../api/user.api';
import style from './Shop.module.css'
import ProductCard from '../../components/ProductCard/ProductCard';


const Shop: React.FC = () => {
  const [filters, setFilters] = useState({
    bodyType: '',
    productType: '',
    brand: '',
    size: '',
    color: '',
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await getAllProducts();
      setAllProducts(data.data);
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filteredResult = [...allProducts];
      Object.keys(filters).forEach((filterName) => {
        if (filters[filterName]) {
          filteredResult = filteredResult.filter(
            (product) => product[filterName].toLowerCase().includes(filters[filterName].toLowerCase())
          );
        }
      });

      setFilteredProducts(filteredResult);
    };

    filterProducts();
  }, [filters, allProducts]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className={style.shoppage}>
      <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      <div className={style.productlist}>
        <ul>
          {filteredProducts.map((product: any, index: number) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
