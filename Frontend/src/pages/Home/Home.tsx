import { useEffect, useState } from "react";
import { getRecentProducts } from "../../api/user.api";
import style from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button, Container } from "../../components";
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
      <div className={style.banners}>
        <h1>Home</h1>
        <Button className={style.button} onClick={() => navigate("/shop")}>
          GO TO SHOP
        </Button>
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
