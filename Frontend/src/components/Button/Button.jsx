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
      onClick={props.onClick}
      className={`button ${className}`}
      style={{
        backgroundColor: `${bgColor}`,
        color: `${textColor}`,
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
