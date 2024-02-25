import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import style from "./Header.module.css";
import {
  toggleCartVisibility,
} from "../../redux/reducers/cartSlice";

//Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { toggleWishlistVisibility } from "../../redux/reducers/wishlistSlice";
import { toggleProfileVisibility } from "../../redux/reducers/authSlice";
import Searchbar from "../Searchbar/Searchbar";

const Header = () => {
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  console.log(isSearchOpen);
  const [active, setActive] = useState("Home");
  const [sidebar, setSidebar] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const isAdmin = useSelector((state) => state.auth.userData?.role) === "admin";

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
  
  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };

  const handleToggleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };

  const toggleSearchVisibility = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
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
                    className={
                      item.name === active
                        ? style.activeNavListItemButton
                        : style.navListItemButton
                    }
                    onClick={() => {
                      navigate(item.slug);
                      setActive(item.name);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          <ul className={style.iconList}>
            <li className={style.iconListItems} onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <SearchIcon />
            </li>
            <li className={style.iconListItems}>
              <ShoppingCartIcon onClick={handleToggleCartVisibility} />
            </li>
            <li
              className={style.iconListItems}
              onClick={handleToggleWishlistVisibility}
            >
              <FavoriteIcon />
            </li>
            <li className={style.iconListItems}
              onClick={handleToggleProfileVisibility}>
              <AccountCircleIcon />
            </li>
          </ul>
          <Searchbar open={isSearchOpen} close={toggleSearchVisibility} />
        </nav>
      </Container>
    </header>
    <div className={style.topbar}>
    <span className={style.openbtn} onClick={() => setSidebar(!sidebar)}>&#9776;</span>
    <Logo width="100px" />
      <div className={sidebar? style.sidenav : style.closeSidenav}>
        <a className={style.closebtn} onClick={() => setSidebar(!sidebar)}>&times;</a>
        <h1>Menu</h1>
        <a href="#">My Profile</a>
        <a href="#">Orders</a>
        <a href="#">My Wishlist</a>
        <a href="#">Delivery Address</a>
        <a href="/blogs">Blogs</a>
        <div className={style.buttons}>
          {authStatus ? <div>
              <button className={style.loginbtn} onClick={navigate('/login')}>Login</button>
              <button className={style.loginbtn} onClick={navigate('/register')}>Signup</button>
            </div>
            : <LogoutBtn/>
          }
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
