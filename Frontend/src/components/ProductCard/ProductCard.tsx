import style from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <img src={product.images[0]} alt="" className={style.productImage} />
    </div>
  );
};

export default ProductCard;
