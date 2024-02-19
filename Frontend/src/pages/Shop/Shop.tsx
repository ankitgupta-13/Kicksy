import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import style from './Shop.module.css'

interface Product {
  id: string;
  name: string;
  bodyType: string;
  productType: string;
  brand: string;
  size: string;
  color: string;
}

const Shop: React.FC = () => {
  const [filters, setFilters] = useState({
    bodyType: '',
    productType: '',
    brand: '',
    size: '',
    color: '',
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setAllProducts(data.products);
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
        <h2>Filtered Products</h2>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.bodyType}, {product.productType}, {product.brand}, {product.size}, {product.color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
