import React, { useId } from "react";
import style from "./Select.module.css";

const Select = (
  { border, height, options, label, className = "", multiple, ...props },
  ref
) => {
  const id = useId();
  return (
    <div className={style.container}>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={style.select}
        style={{ height: `${height}`, border: `${border}` }}
        multiple
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
