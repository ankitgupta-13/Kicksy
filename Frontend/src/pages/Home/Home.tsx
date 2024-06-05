import { useEffect, useRef, useState } from "react";
import { getRecentProducts } from "../../api/user.api";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProductCard from "../../components/ProductCard/ProductCard";
import SliderCard from "../../components/SliderCard/SliderCard";
import style from "./Home.module.css";

//Importing Images
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import AdidasLogo from "../../assets/images/AdidasLogo.png";
import CustomNike from "../../assets/images/CustomNike.png";
import GirlPic1 from "../../assets/images/GirlPic1.png";
import JordanLogo from "../../assets/images/JordanLogo.png";
import KidPic1 from "../../assets/images/KidPic1.png";
import MenPic1 from "../../assets/images/MenPic1.png";
import NikeLogo from "../../assets/images/NikeLogo.png";
import { ProductType } from "../../types/product.types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sc_companies, setSc_companies] = useState(false);
  const [sc_newArrivals, setSc_newArrivals] = useState(false);
  const [sc_bestSeller, setSc_bestSeller] = useState(false);

  // const arrivaltab1 = useRef("");
  // const arrivaltab2 = useRef("");
  // const arrivaltab3 = useRef("");

  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };

  const arrivaltab1 = useRef<HTMLDivElement>(null);
  const arrivaltab2 = useRef<HTMLDivElement>(null);
  const arrivaltab3 = useRef<HTMLDivElement | null>(null);

  function arrClick1() {
    arrivaltab1.current?.classList.add(style.Active);
    arrivaltab2.current?.classList.remove(style.Active);
    arrivaltab3.current?.classList.remove(style.Active);
  }

  function arrClick2() {
    arrivaltab1.current?.classList.remove(style.Active);
    arrivaltab2.current?.classList.add(style.Active);
    arrivaltab3.current?.classList.remove(style.Active);
  }

  function arrClick3() {
    arrivaltab1.current?.classList.remove(style.Active);
    arrivaltab2.current?.classList.remove(style.Active);
    arrivaltab3.current?.classList.add(style.Active);
  }

  useEffect(() => {
    scrollTo(0, 0);
    getProducts();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 600) {
        setSc_companies(true);
      } else {
        setSc_companies(false);
      }

      if (scrollY > 1200) {
        setSc_newArrivals(true);
      } else {
        setSc_newArrivals(false);
      }

      if (scrollY > 1400) {
        setSc_bestSeller(true);
      } else {
        setSc_bestSeller(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={style.Body} style={{ fontFamily: "Noir Pro" }}>
      <SliderCard />
      <button
        className={style.container__shopbtn}
        onClick={() => navigate("/shop")}
      >
        Go to Shop
      </button>
      <div className={style.Gender}>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img
              src={GirlPic1}
              alt=""
              onClick={() => navigate(`/shop?gender=F`)}
            />
          </div>
          <div className={style.GenderBoxTitle}>Women</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img
              src={MenPic1}
              alt=""
              onClick={() => navigate(`/shop?gender=M`)}
            />
          </div>
          <div className={style.GenderBoxTitle}>Men</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img
              src={KidPic1}
              alt=""
              onClick={() => navigate(`/shop?gender=K`)}
            />
          </div>
          <div className={style.GenderBoxTitle}>Kids</div>
        </div>
        <div className={style.SaleBox}>
          <div className={style.Box}>
            <span
              className={style.SaleBoxContent}
              onClick={() => navigate(`/shop?category=sale`)}
            >
              Sale
            </span>
          </div>
        </div>
      </div>

      <div
        style={{ opacity: sc_companies ? 1 : 0, transitionDuration: ".5s" }}
        className={style.CompanyContainer}
      >
        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?brand=jordan`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={JordanLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Jordan</div>
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?brand=jordan`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={NikeLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Nike</div>
          </div>
          <div className={style.CompanyItemTitle}>Nike</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?brand=jordan`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={AdidasLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Adidas</div>
          </div>
          <div className={style.CompanyItemTitle}>Adidas</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?brand=nike`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={NikeLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Nike</div>
          </div>
          <div className={style.CompanyItemTitle}>Nike</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?category=anime`)}
        >
          <img src={CustomNike} alt="" />
        </div>
      </div>

      <div
        style={{ opacity: sc_newArrivals ? 1 : 0, transitionDuration: ".5s" }}
        className={style.NewArrivals}
      >
        <div className={style.NewArrivalsTabs}>
          <h1
            onClick={() => arrClick1()}
            ref={arrivaltab1}
            className={`${style.NewArrivalsSliderTitle} ${style.Active}`}
          >
            New Arrivals
          </h1>
          <h1
            onClick={() => arrClick2()}
            ref={arrivaltab2}
            className={style.NewArrivalsSliderTitle}
          >
            What's New
          </h1>
          <h1
            onClick={() => arrClick3()}
            ref={arrivaltab3}
            className={style.NewArrivalsSliderTitle}
          >
            For You
          </h1>
        </div>
        <div className={style.PopularShoes}>Popular Shoes</div>
        <div className={style.Slider}>
          <div className={`${style.cards} ${style.popularCards}`}>
            {products.map((product: ProductType, index: number) => {
              return (
                <div
                  key={index}
                  className={style.container}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.images[0]}
                    className={style.shoes__image}
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <div
                    className={style.shoes__name}
                    style={{ width: "8rem", textWrap: "balance" }}
                  >
                    {product.title}
                  </div>
                  <div className={style.shoes__price}>{product.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{ opacity: sc_bestSeller ? 1 : 0, transitionDuration: ".5s" }}
        className={style.BestSellerSlider}
      >
        <h1 className={style.BestSellerSliderHeading}>Best Sellers</h1>
        <div className={style.Slider}>
          <div className={`${style.cards} ${style.BestSellerCards}`}>
            {products.map((product: Object, index: number) => {
              return (
                <div
                  className={style.BestSellerCard}
                  key={index}
                  style={{ width: "18rem" }}
                >
                  <MediaQuery minWidth={431}>
                    <ProductCard product={product} wid="18.5vw" />
                  </MediaQuery>
                  <MediaQuery maxWidth={431}>
                    <ProductCard product={product} wid="10rem" />
                  </MediaQuery>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <HeroSection />
    </div>
  );
};

export default Home;
