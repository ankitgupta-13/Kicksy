import { useDispatch } from "react-redux";
import {
  selectAction,
  selectProduct,
} from "../../redux/reducers/adminDashboardSlice";
import style from "./ProductAdminDashboardCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductAdminDashboardCard = ({ data, onDeleteProduct }) => {
  const { _id, title, createdAt, stock, images, price } = data;
  const finalPrice =
    price.originalPrice - price.discountPercent * price.originalPrice * 0.01;
  const createdDate = createdAt.split("T")[0];
  const createdTime = createdAt.split("T")[1].split(".")[0];
  const dispatch = useDispatch();

  const handleDeleteProduct = async (_id: Number) => {
    onDeleteProduct(_id, images);
  };

  const handleShowProduct = () => {
    dispatch(selectProduct(_id)),
      dispatch(
        selectAction({
          selectedSection: "product",
          selectedAction: "detailProduct",
        })
      );
  };

  return (
    <div className={style.cardContainer} onClick={handleShowProduct}>
      <div className={style.nameImage}>
        <img src={images[0]} alt="" className={style.image} />
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.createdAt}>
        <div className={style.date}>{createdDate}</div>
        <div className={style.time}>{createdTime}</div>
      </div>
      <div className={style.stock}>{stock}</div>
      <div className={style.priceDelete}>
        <div>₹{finalPrice}</div>
      </div>
      <div className={style.Delete}>
        <DeleteIcon onClick={() => handleDeleteProduct(_id)} /></div>
    </div>
  );
};

export default ProductAdminDashboardCard;
