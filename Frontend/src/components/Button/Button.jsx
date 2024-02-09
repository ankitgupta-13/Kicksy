import React from "react";
import style from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  bgColor = "#000000",
  textColor = "#ffffff",
  className = "",
  ...props
}) => {
  return (
    <button
      className={style.btn}
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
    >
      {children}
    </button>
  );
};

export default Button;
