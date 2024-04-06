const Button = ({
  children = "SUBMIT",
  type = "button",
  bgColor = "#000000",
  textColor = "#ffffff",
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`button ${className}`}
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
