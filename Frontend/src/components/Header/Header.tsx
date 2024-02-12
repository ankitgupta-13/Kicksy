import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import style from "./Header.module.css";

//Images and Icons
import searchIcon from "../../assets/search.png";
import shoppingBagIcon from "../../assets/local_mall.png";
import profileIcon from "../../assets/person_4.png";
import favouriteIcon from "../../assets/favorite.png";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Shop", slug: "/shop", isActive: true },
    { name: "Custom Anime", slug: "/anime", isActive: true },
    { name: "Track Order", slug: "/order", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/register", isActive: !authStatus },
  ];
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
            <li className={style.iconListItems}>
              <img src={shoppingBagIcon} alt="ShoppingBag" />
            </li>
            <li className={style.iconListItems}>
              <img src={favouriteIcon} alt="Favourite" />
            </li>
            <li className={style.iconListItems}>
              <img src={profileIcon} alt="Profile" />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
