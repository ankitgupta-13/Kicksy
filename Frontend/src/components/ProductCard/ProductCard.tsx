import style from "./ProductCard.module.css";
import ColorCard from "../colorCard/colorCard";
import Fire from "../../assets/images/fire.png";
import Add from "../../assets/images/add.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SliderCardProdCard from "../SliderCardProdCard/SliderCard";
import MediaQuery from "react-responsive";

const ProductCard = ({ product, wid }) => {
  const navigate = useNavigate();
  const [shoesColorData, setShoesColorData] = useState(product.images);

  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = useState<number | null>(null);
  // const [marLeftHover, setMarLeftHover] = useState(shoesColorData.length * 0);

  useEffect(() => {
    setShoesColorData(product.images);
    setActiveColor(product.images[0]);
    setActiveColorId(0);
  }, [product.images]);

  const handleImageSrcChange = (src: string) => {
    setActiveColor(src);
  };
  return (
    <div className={style.container} style={{ width: wid }} onClick={() => window.location.href = `/product/${product._id}`}>
      <div className={style.container__header}>
        <div className={style.container__hotitem}>
          <img src={Fire} alt="error" />
        </div>
        <img src={Add} className={style.container__addcard} alt="error" />
      </div>
      <div className={style.shoes__bestseller}>
        <div className={style.shoes__bestseller_text}>BestSeller</div>
      </div>
      <div
        style={{ backgroundImage: `url(${activeColor})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        className={style.shoes__image}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {/* <SliderCardProdCard product={shoesColorData} /> */}
      </div>
      {/* <ProdCardCarousel productC={shoesColorData} /> */}
      <div className={style.shoes__color}>
        {shoesColorData.slice(0, 4)?.map((color, index) => (
          <ColorCard
            key={index}
            id={index}
            color={color}
            activeId={activeColorId || 0}
            setActiveId={(id) => setActiveColorId(id)}
            setImageSrc={handleImageSrcChange}
          />
        ))}
      </div>
      <div
        className={style.shoes__info}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className={style.shoes__data}>
          <div className={style.shoes__name}>{product.title}</div>
          <MediaQuery minWidth={631}>{window.location.href === "/dashboard" && <div className={style.shoes__price}>₹ {product?.bestPrice?.price.toLocaleString('en-IN')}</div>}</MediaQuery>
        </div>
        <p className={style.shoes__tags}>{product.category}</p>
        <div className={style.mobile__shoes_price}>INR {product?.price || product?.bestPrice?.price}</div>
        <div className={style.mobile__expected_price}>{product.price}</div>
        <p className={style.shoes__tagline}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
