import style from "./ProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className={style.container} onClick={()=>navigate(`/productdesc?product=${product._id}`)}>
      <img src={product.images[0]} alt="" className={style.productImage} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductCard;
