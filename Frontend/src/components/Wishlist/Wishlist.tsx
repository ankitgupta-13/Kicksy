import { useDispatch, useSelector } from "react-redux";
import style from "./Wishlist.module.css";
import { toggleWishlistVisibility } from "../../redux/reducers/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlistOpen = useSelector((state) => state.wishlist.isOpen);

  const handleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  return (
    <div>
      <div
        id="mySidenav"
        className={`${style.sidenav} ${isWishlistOpen ? style.open : ""}`}
      >
        <h3>Wishlist</h3>
        <a
          href="javascript:void(0)"
          className={style.closebtn}
          onClick={handleWishlistVisibility}
        >
          &times;
        </a>
      </div>
    </div>
  );
};

export default Wishlist;
