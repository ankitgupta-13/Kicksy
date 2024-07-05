import logoImg from "../../assets/Krisksy.png";
import style from "./Logo.module.css";

const Logo = () => {
  return (
    <div>
      <img className={style.Logo} src={logoImg} alt="" />
    </div>
  );
};

export default Logo;
