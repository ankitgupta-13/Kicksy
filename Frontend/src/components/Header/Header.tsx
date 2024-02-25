import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import style from "./Header.module.css";
import {
  setInitialCartItems,
  toggleCartVisibility,
} from "../../redux/reducers/cartSlice";
import { toggleWishlistVisibility } from "../../redux/reducers/wishlistSlice";

//Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { getUserCartItems } from "../../api/user.api";

const Header = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const isAdmin = useSelector((state) => state.auth.userData?.role) === "admin";
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Shop", slug: "/shop", isActive: true },
    { name: "Custom Anime", slug: "/anime", isActive: true },
    { name: "Track Order", slug: "/trackorder", isActive: true },
    { name: "Blogs", slug: "/blogs", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/register", isActive: !authStatus },
    isAdmin && {
      name: "Dashboard",
      slug: "/admin",
      isActive: isAdmin,
    },
  ];

  const handleCart = async (userID) => {
    dispatch(toggleCartVisibility());
    const response = await getUserCartItems({ userID });
    console.log(response);
    if (response.statusCode === 200)
      dispatch(setInitialCartItems(response.data.items));
  };

  const handleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  return (
    <header className={style.header}>
      <Container>
        <nav className={style.nav}>
          <div>
            <Logo width="100px" />
          </div>
          <ul className={style.navList}>
            {navItems.map((item) =>
              item.isActive ? (
                <li className={style.navListItem} key={item.name}>
                  <button
                    className={style.navListItemButton}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <ul className={style.iconList}>
            <li className={style.iconListItems}>
              <SearchIcon />
            </li>
            <li className={style.iconListItems}>
              <ShoppingCartIcon onClick={() => handleCart(userID)} />
            </li>
            <li
              className={style.iconListItems}
              onClick={handleWishlistVisibility}
            >
              <FavoriteIcon />
            </li>
            <li className={style.iconListItems}>
              <AccountCircleIcon />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
