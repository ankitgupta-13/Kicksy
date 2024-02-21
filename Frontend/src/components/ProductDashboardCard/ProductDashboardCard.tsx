import style from "./ProductDashboardCard.module.css";

const ProductDashboardCard = ({ data }) => {
  const { title, createdAt, stock, images, price } = data;
  const finalPrice =
    price.originalPrice - price.discountPercent * price.originalPrice * 0.01;
  const createdDate = createdAt.split("T")[0];
  const createdTime = createdAt.split("T")[1].split(".")[0];

  return (
    <div className={style.cardContainer}>
      <img src={images[0]} alt="" className={style.image} />
      <div className={style.title}>{title}</div>
      <div>
        <div className={style.date}>{createdDate}</div>
        <div className={style.time}>{createdTime}</div>
      </div>
      <div>{stock}</div>
      <div>₹{finalPrice}</div>
    </div>
  );
};

export default ProductDashboardCard;
