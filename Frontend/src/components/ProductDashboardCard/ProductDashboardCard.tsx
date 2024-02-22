import { deleteProduct } from "../../api/admin.api";
import style from "./ProductDashboardCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductDashboardCard = ({ data, onDeleteProduct }) => {
  const { _id, title, createdAt, stock, images, price } = data;
  const finalPrice =
    price.originalPrice - price.discountPercent * price.originalPrice * 0.01;
  const createdDate = createdAt.split("T")[0];
  const createdTime = createdAt.split("T")[1].split(".")[0];

  const handleDeleteProduct = async (_id: Number) => {
    onDeleteProduct(_id, images);
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.nameImage}>
        <img src={images[0]} alt="" className={style.image} />
        <div className={style.title}>{title}</div>
      </div>
      <div>
        <div className={style.date}>{createdDate}</div>
        <div className={style.time}>{createdTime}</div>
      </div>
      <div>{stock}</div>
      <div className={style.priceDelete}>
        <div>₹{finalPrice}</div>
        <DeleteIcon onClick={() => handleDeleteProduct(_id)} />
      </div>
    </div>
  );
};

export default ProductDashboardCard;
