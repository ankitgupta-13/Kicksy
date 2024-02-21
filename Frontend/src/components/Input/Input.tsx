import React, { useId } from "react";
import style from "./Input.module.css";

const Input = (
  { label, type = "text", placeholder = "text", className = "", ...props }: any,
  ref
) => {
  const id = useId();
  return (
    <div className={style.inputDiv}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={style.inputBox}>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
          id={id}
        />
        {props.showImage && (
          <div className={style.imageDiv}>{props.showImage}</div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Input);
