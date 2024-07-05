import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import Add from "../../assets/images/add.png";
import Fire from "../../assets/images/fire.png";
import ColorCard from "../colorCard/colorCard";
import style from "./ProductCardAnime.module.css";

const ProductCardAnime = ({ product, wid = "24.5vw" }) => {
  const [shoesColorData, setShoesColorData] = useState(product.images);

  const [activeColor, setActiveColor] = useState("");
  const [activeColorId, setActiveColorId] = (useState < number) | (null > null);

  const handleImageSrcChange = (src) => {
    setActiveColor(src);
  };
  useEffect(() => {
    function handleImgHover() {
      setTimeout(() => {
        setActiveColorId(activeColorId + 1);
      }, 2000);
    }
  }, []);

  return (
    <div className={style.container} style={{ width: wid }}>
      <div className={style.container__header}>
        <div className={style.container__hotitem}>
          <img src={Fire} alt="error" />
        </div>
        <img src={Add} className={style.container__addcard} alt="error" />
      </div>
      <div className={style.shoes__bestseller}>
        <div className={style.shoes__bestseller_text}>BestSeller</div>
      </div>
      <img
        src={activeColor}
        className={style.shoes__image}
        onMouseOver={() => handleImgHover()}
      />
      {/* <ProdCardCarousel productC={shoesColorData} /> */}
      <div className={style.shoes__color}>
        {shoesColorData.map((color, index) => (
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
      <div className={style.shoes__info}>
        <div className={style.shoes__data}>
          <div className={style.shoes__name}>{product.title}</div>
          <MediaQuery minWidth={631}>
            <div className={style.shoes__price}>
              ₹ {product?.bestPrice?.price.toLocaleString("en-IN")}
            </div>
          </MediaQuery>
        </div>
        <p className={style.shoes__tags}>{product.category}</p>
        <div className={style.mobile__shoes_price}>
          ₹ {product?.bestPrice?.price.toLocaleString("en-IN")}
        </div>
        <div className={style.mobile__expected_price}>{product.price}</div>
        <p className={style.shoes__tagline}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCardAnime;
