import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../api/admin.api";
import {
  selectAdminAction,
  selectAdminProduct,
  selectAdminProductRequest,
} from "../../redux/reducers/adminDashboardSlice";
import {
  selectSellerAction,
  selectSellerProduct,
} from "../../redux/reducers/sellerDashboardSlice";
import Button from "../Button";
import style from "./ProductDashboardCard.module.css";

const ProductDashboardCard = ({ data, type }) => {
  const {
    _id,
    title,
    createdAt,
    stock,
    images,
    brand,
    skuID,
    bestPrice,
    price,
  } = data;
  const createdDate = createdAt.split("T")[0];
  const createdTime = createdAt.split("T")[1].split(".")[0];
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userData?.role);
  const currentAction = useSelector(
    (state) => state.adminDashboard.currentAction
  );
  console.log(data);

  const handleShowProduct = () => {
    userRole === "admin"
      ? (type === "request"
          ? dispatch(selectAdminProductRequest(_id))
          : dispatch(selectAdminProduct(_id)),
        dispatch(
          selectAdminAction({
            selectedSection: "Product",
            selectedAction: "Details",
          })
        ))
      : dispatch(selectSellerProduct(_id)),
      dispatch(
        selectSellerAction({
          selectedSection: "Product",
          selectedAction: "Details",
        })
      );
  };

  const handleDeleteProduct = async (_id, images) => {
    try {
      await deleteProduct({ _id, images });
      // getLimitedProducts(page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={handleShowProduct}>
      {userRole === "admin" ? (
        <div className={style.cardContainer}>
          <div className={style.nameImage}>
            <div
              className={style.image}
              style={{
                background: `url(${images[0]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.createdAt}>
            <div className={style.date}>{createdDate}</div>
            <div className={style.time}>{createdTime}</div>
          </div>
          <div className={style.stock}>{stock}</div>
          <div className={style.priceDelete}>
            {currentAction === "Requests" ? (
              <div>₹ {price.toLocaleString("en-IN")}</div>
            ) : (
              <div>₹ {bestPrice?.price.toLocaleString("en-IN")}</div>
            )}
            <Button>
              <MdDelete
                onClick={() => handleDeleteProduct(_id, images)}
                size={30}
              />
            </Button>
          </div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.nameImage}>
            <div
              className={style.image}
              style={{
                background: `url(${images[0]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className={style.title}>{title}</div>
          </div>
          <div className={style.skuid}>{skuID}</div>
          <div className={style.brand}>{brand}</div>
          <div className={style.priceDelete}>
            <div>₹{bestPrice?.price.toLocaleString("en-IN")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboardCard;
