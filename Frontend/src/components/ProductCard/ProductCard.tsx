import style from "./ProductCard.module.css";
import Shoes from "../../assets/adidas.png";
import ColorCard from "../colorCard/colorCard";
import Fire from "../../assets/images/fire.png";
import Add from "../../assets/images/add.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [shoesColorData, setShoesColorData] = useState([product.images]);
  const [activeId, setActiveId] = useState();
  const [imagesrc, setImageSrc] = useState(Shoes);

  return (
    <div className={style.container}>
      <div className={style.container__header}>
        <div className={style.container__hotitem}>
          <img src={Fire} alt="error" />
        </div>
        <img src={Add} className={style.container__addcard} alt="error" />
      </div>
      <div className={style.shoes__bestseller}>
        <div className={style.shoes__bestseller_text}>BestSeller</div>
      </div>
      <div className={style.shoes}>
        <img
          src={shoesColorData[0]}
          className={style.shoes__image}
          onClick={() => navigate(`/productdesc?product=${product._id}`)}
        />
      </div>

      <div className={style.shoes__color}>
        {shoesColorData.map((item: any) => {
          return (
            <ColorCard
              setImageSrc={setImageSrc}
              color={item.color}
              key={item.id}
              id={item.id}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          );
        })}
      </div>
      <div className={style.shoes__info}>
        <div className={style.shoes__data}>
          <div className={style.shoes__name}>{product.title}</div>
          {/* <div className={style.shoes__price}>{product.price}</div> */}
        </div>
        <p className={style.shoes__tags}>{product.category}</p>
        {/* <div className={style.mobile__shoes_price}>INR {product.price}</div> */}
        {/* <div className={style.mobile__expected_price}>{product.price}</div> */}
        <p className={style.shoes__tagline}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
