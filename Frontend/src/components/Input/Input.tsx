import React, { useId } from "react";
import style from "./Input.module.css"

const Input = ({ label, type = "text",placeholder="text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className={style.inputDiv}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} placeholder={placeholder}  ref={ref} {...props} id={id} />
    </div>
  );
};

export default React.forwardRef(Input);
