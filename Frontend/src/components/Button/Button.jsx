import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "#e2e2e2",
  textColor = "#000000",
  className = "",
  onClick ,
  ...props
}) => {
  return (
    <button onClick={onClick} className={`button ${className}`} style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }} {...props}>
      {children}
    </button>
  );
};

export default Button;
