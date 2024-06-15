import { useState, useEffect } from 'react';
import { searchProducts } from '../../api/user.api';
import CartItem from '../CartItem/CartItem';
import style from './Searchbar.module.css';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';


const Searchbar = ({ open, close }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const search = async () => {
    const response = await searchProducts(searchTerm);
    if (response.statusCode === 200) setProducts(response.data);
  };
  const clearInput = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    search();
  }, [searchTerm]);

  return (
    <div className={`${style.sidenav} ${open ? style.open : ''}`}>
      <div className={style.head}>
        <div className={style.searchContainer}>
          <input
            type="text"
            className={style.search}
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button className={style.clearButton} onClick={clearInput}>&times;</button> */}
          <button className={style.searchButton} onClick={search}><SearchIcon /></button>
        </div>
        <a className={style.closebtn} onClick={close}>&times;</a>
      </div>
      <div className={style.searched} style={{ width: '100%', height: '100%' }} onClick={close}>
        {searchTerm && <ul style={{ display: 'flex', gap: "1rem", padding: "1rem", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div style={{backgroundColor: 'white'}} onClick={() => { navigate(`/product/${product._id}`); close() }}>
              <ProductCard product={product} wid={'20rem'} />
            </div>
          ))}
        </ul>}
      </div>
    </div>
  );
};

export default Searchbar;
