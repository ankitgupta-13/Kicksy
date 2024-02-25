import { useEffect, useState } from "react";
import { getRecentProducts } from "../../api/user.api";
import style from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import SliderCard from "../../components/SliderCard/SliderCard";
import { Container } from "../../components";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <SliderCard />
      <div className={style.Gender}>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}></div>
          <div className={style.GenderBoxTitle}>Women</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}></div>
          <div className={style.GenderBoxTitle}>Men</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}></div>
          <div className={style.GenderBoxTitle}>Kids</div>
        </div>
        <div className={style.SaleBox}>
          <div className={style.Box}>
            <span className={style.SaleBoxContent}>Sale</span>
          </div>
        </div>
      </div>

      <div className={style.CompanyContainer}>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}></div>
        </div>
      </div>

      <p>Welcome to the home page</p>
      <div>
        <h1>New Arrivals</h1>

        <div className={style.cards}>
          {products.map((product: Object, index: number) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Home;
