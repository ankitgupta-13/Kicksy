import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { getRecentProducts } from "../../api/user.api";
import AdidasLogo from "../../assets/images/AdidasLogo.png";
import CustomNike from "../../assets/images/CustomNike.png";
import GirlPic1 from "../../assets/images/GirlPic1.png";
import JordanLogo from "../../assets/images/JordanLogo.png";
import KidPic1 from "../../assets/images/KidPic1.png";
import MenPic1 from "../../assets/images/MenPic1.png";
import NikeLogo from "../../assets/images/NikeLogo.png";
import HeroSection from "../../components/HeroSection/HeroSection";
import LoadingCard from "../../components/LoadingCard/LoadingCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import SliderCard from "../../components/SliderCard/SliderCard";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [sc_companies, setSc_companies] = useState(false);
  const [sc_newArrivals, setSc_newArrivals] = useState(false);
  const [sc_bestSeller, setSc_bestSeller] = useState(false);

  const arrivaltab1 = useRef("");
  const arrivaltab2 = useRef("");
  const arrivaltab3 = useRef("");

  const [arrivaltab, setArrivaltab] = useState(1);

  function arrClick1() {
    arrivaltab1.current.classList.add(style.Active);
    arrivaltab2.current.classList.remove(style.Active);
    arrivaltab3.current.classList.remove(style.Active);
    setArrivaltab(1);
  }

  function arrClick2() {
    arrivaltab1.current.classList.remove(style.Active);
    arrivaltab2.current.classList.add(style.Active);
    arrivaltab3.current.classList.remove(style.Active);
    setArrivaltab(2);
  }

  function arrClick3() {
    arrivaltab1.current.classList.remove(style.Active);
    arrivaltab2.current.classList.remove(style.Active);
    arrivaltab3.current.classList.add(style.Active);
    setArrivaltab(3);
  }
  const { data: recentProducts, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: async () => {
      const data = await getRecentProducts();
      return data.data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 600 || window.innerWidth < 431) {
        setSc_companies(true);
      } else {
        setSc_companies(false);
      }

      if (scrollY > 1200 || window.innerWidth < 431) {
        setSc_newArrivals(true);
      } else {
        setSc_newArrivals(false);
      }

      if (scrollY > 1400 || window.innerWidth < 431) {
        setSc_bestSeller(true);
      } else {
        setSc_bestSeller(false);
      }
    };

    // {window.innerWidth > 431 ? window.addEventListener('scroll', onScroll) : window.removeEventListener('scroll', onScroll)}
    window.addEventListener("scroll", onScroll);
    window.scrollTo(0, 1);

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
            <img src={GirlPic1} alt="" onClick={() => navigate(`/shop?F`)} />
          </div>
          <div className={style.GenderBoxTitle}>Women</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img src={MenPic1} alt="" onClick={() => navigate(`/shop?M`)} />
          </div>
          <div className={style.GenderBoxTitle}>Men</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img src={KidPic1} alt="" onClick={() => navigate(`/shop?K`)} />
          </div>
          <div className={style.GenderBoxTitle}>Kids</div>
        </div>
        <div className={style.SaleBox}>
          <div className={style.Box}>
            <span
              className={style.SaleBoxContent}
              onClick={() => navigate(`/shop?sale`)}
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
          onClick={() => navigate(`/shop?Jordan`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={JordanLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Jordan</div>
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?Nike`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={NikeLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Nike</div>
          </div>
          <div className={style.CompanyItemTitle}>Nike</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?Adidas`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={AdidasLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Adidas</div>
          </div>
          <div className={style.CompanyItemTitle}>Adidas</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => navigate(`/shop?Nike`)}
        >
          <div className={style.CompanyItem}>
            <img className={style.CompanyItemBoxImg} src={NikeLogo} alt="" />
            <div className={style.CompanyItemBoxTitle}>Nike</div>
          </div>
          <div className={style.CompanyItemTitle}>Nike</div>
        </div>

        <div
          className={style.CompanyItemBox}
          onClick={() => {
            navigate(`/anime`), window.scrollTo(0, 0);
          }}
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
          {arrivaltab === 1 && (
            <div className={`${style.cards} ${style.popularCards}`}>
              {recentProducts?.map((product, index) => {
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
          )}
          {arrivaltab === 2 && (
            <div className={`${style.cards} ${style.popularCards}`}>
              {recentProducts?.map((product, index) => {
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
                      alt="not found"
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
          )}
          {arrivaltab === 3 && (
            <div className={`${style.cards} ${style.popularCards}`}>
              {recentProducts
                ?.filter((product) => product.category === "anime")
                .slice(0, 5)
                .map((product, index) => {
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
          )}
        </div>
      </div>

      <div
        style={{ opacity: sc_bestSeller ? 1 : 0, transitionDuration: ".5s" }}
        className={style.BestSellerSlider}
      >
        <h1 className={style.BestSellerSliderHeading}>Best Sellers</h1>
        <div className={style.Slider}>
          <div className={`${style.cards} ${style.BestSellerCards}`}>
            {isLoading ? (
              <div className={`${style.cards} ${style.BestSellerCards}`}>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </div>
            ) : (
              recentProducts?.map((product, index) => {
                return (
                  <div className={style.BestSellerCard} key={index}>
                    <MediaQuery minWidth={431}>
                      <ProductCard product={product} wid="18.5vw" />
                    </MediaQuery>
                    <MediaQuery maxWidth={431}>
                      <ProductCard product={product} wid="10rem" />
                    </MediaQuery>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <HeroSection />
    </div>
  );
};

export default Home;
