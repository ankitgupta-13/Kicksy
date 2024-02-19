import { useLocation } from "react-router-dom";
import style from "./ProductDesc.module.css";
import {useEffect, useState } from "react";
import { getRecentProducts, addToCart } from "../../api/user.api"
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button } from "../../components/index";
import { useSelector} from "react-redux";
import { getProductById } from "../../api/user.api";
import { RootState } from "@reduxjs/toolkit/query";


const ProductDesc = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("product");
    const [products, setProducts] = useState([]);
    const [curProduct, setCurProduct] = useState([]);
    const [size, setSize] = useState();
    const user = useSelector((state : any) => state.auth?.userData?.data._id);

    const getProducts = async () => {
      const response = await getRecentProducts();
      if (response.statusCode === 200) setProducts(response.data);
    };
    const getCurrentProduct = async () => {
      const payload = {
        productID : id
      }
      const response = await getProductById(payload);
      if (response.statusCode === 200) setCurProduct(response.data);
    }
    useEffect(() => {
      getProducts();
      getCurrentProduct();
    }, []);

    const sizes = [
      { label: 'Select Size' },
      { label: '11', value: '11' },
      { label: '12', value: '12' },
      { label: '13', value: '13' },
    ];

    const handleChange = (event: any) => {
      setSize(event.target.value);
    };

    const handleAddToCart = async () => {
      const payload = {
        userID: user,
        productID: id,
      };
      try {
        const result = await addToCart(payload);
        console.log(result);

      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

  return (
    <div>
      <div className={style.product}>
      <img src={curProduct.images} className={style.imagebox} alt="product-image"/>
      <div className={style.action}>
          <h4>{curProduct.brand}</h4>
          <h2>{curProduct.title}</h2>
          <a className={style.bestseller}>BEST SELLER</a>
          <h2>Rs. {curProduct.price}</h2>
          <div >
          <select className={style.size} value={size} onChange={handleChange}>
         {sizes.map((size: any) => (
           <option value={size.value}>{size.label}</option>
         ))}
          </select>
          </div>
       <Button
          className={style.addtocart}
          style={{ backgroundColor: "#131313", color: "white" }}
          onClick={handleAddToCart}
          type="submit"
        >Add to Cart</Button>

      </div>
      </div>
      <h3>{curProduct.description}</h3>
      <a>Read More</a>
      <div className={style.table}>
        <div className={style.column}>
          <h5>MANUFACTURED SKU</h5>
          <p></p>
          <h5>COLORWAY</h5>
          <p></p>
        </div>
        <div className={style.column}>
          <h5>BRAND</h5>
          <p></p>
          <h5>GENDER</h5>
          <p></p>
        </div>
        <div className={style.column}>
          <h5>NICKNAME</h5>
          <p></p>
          <h5>RELEASE DATE</h5>
          <p></p>
        </div>
      </div>
        <div>
          <h1>You may also like</h1>
          <div className={style.cards}>
            {products.map((product: any, index: number) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
            </div>
            <h1>New Arrivals</h1>
          <div className={style.cards}>
            {products.map((product: any, index: number) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
            </div>
        </div>
    </div>
  )
}

export default ProductDesc