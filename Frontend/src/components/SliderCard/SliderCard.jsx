import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import style from "./SliderCard.module.css";

import MediaQuery from "react-responsive";
import HeroShoes from "../../assets/images/hero-product.png";
const SliderCard = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      name: "Air Jordan",
    },
    {
      id: 2,
      name: "Air Max",
    },
    {
      id: 3,
      name: "Air Force",
    },
    {
      id: 4,
      name: "Nike Dunk",
    },
  ]);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {data.map((item) => (
        <div key={item.id}>
          <MediaQuery minWidth={431}>
            <div className={style.container}>
              <div className={style.container__backgroudtext}>The New 2023</div>
              <div className={style.container__shoesname}>{item.name}</div>
              <div className={style.container__info}>
                <img
                  className={style.container__shoesimage}
                  src={HeroShoes}
                  alt="shoes"
                />
              </div>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={431}>
            <div className={style.container} onClick={() => navigate("/shop")}>
              <div className={style.container__backgroudtext}>The New 2023</div>
              <div className={style.container__shoesname}>{item.name}</div>
              <div className={style.container__info}>
                <img
                  className={style.container__shoesimage}
                  src={HeroShoes}
                  alt="shoes"
                />
              </div>
            </div>
          </MediaQuery>
          {/* <button className={style.container__shopbtn} onClick={() => navigate("/shop")}>Go to Shop</button> */}
        </div>
      ))}
    </Slider>
  );
};

export default SliderCard;
