import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import style from "./Header.module.css";
import {toggleCartVisibility} from "../../redux/reducers/cartSlice";
import { toggleWishlistVisibility} from "../../redux/reducers/wishlistSlice";
import { toggleProfileVisibility } from '../../redux/reducers/authSlice';

import searchIcon from "../../assets/search.png";
import shoppingBagIcon from "../../assets/local_mall.png";
import profileIcon from "../../assets/person_4.png";
import favouriteIcon from "../../assets/favorite.png";


const Header = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const isAdmin = useSelector((state) => state.auth.userData?.role);
  
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Shop", slug: "/shop", isActive: true },
    { name: "Custom Anime", slug: "/anime", isActive: true },
    { name: "Track Order", slug: "/trackorder", isActive: true },
    { name: "Blogs", slug: "/blogs", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/register", isActive: !authStatus },
    isAdmin === "admin" && {
      name: "Dashboard",
      slug: "/admin",
      isActive: isAdmin,
    },
  ];
  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };
  
  const handleToggleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
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
              <img src={searchIcon} alt="Search" />
            </li>
            <li
              className={style.iconListItems}
              onClick={handleToggleCartVisibility}>
              <img src={shoppingBagIcon} alt="ShoppingBag" />
            </li>
            <li 
              className={style.iconListItems}
              onClick={handleToggleWishlistVisibility}>
              <img src={favouriteIcon} alt="Favourite" />
            </li>
            <li className={style.iconListItems}
              onClick={handleToggleProfileVisibility}>
              <img src={profileIcon} alt="Profile" />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
