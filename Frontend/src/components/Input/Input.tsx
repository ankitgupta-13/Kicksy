// import React, { useId } from "react";
// import style from "./Input.module.css";

// const Input = (
//   {
//     margin,
//     border,
//     padding,
//     width,
//     label,
//     labelcheckbox,
//     type = "text",
//     placeholder = "text",
//     className = "",
//     defaultValue,
//     onChange,
//     ss,
//     ...props
//   }: any,
//   ref
// ) => {
//   const id = useId();
//   return (
//     <div className={style.inputDiv} style={{ width: `${width}`, ...ss }}>
//       {label && <label htmlFor={id}>{label}</label>}
//       <div
//         className={style.inputBox}
//         style={{
//           padding: `${padding}`,
//           margin: `${margin}`,
//           border: `${border}`,
//         }}
//       >
//         <input
//           className={className}
//           type={type}
//           placeholder={placeholder}
//           ref={ref}
//           {...props}
//           id={id}
//           defaultValue={defaultValue}
//           onChange={onChange}
//         />
//         {labelcheckbox && <label htmlFor={id}>{labelcheckbox}</label>}
//         {props.showImage && (
//           <div className={style.imageDiv}>{props.showImage}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default React.forwardRef(Input);














import React from "react";
import style from "./Input.module.css";

const Input = ({
  margin,
  border,
  padding,
  width,
  label,
  labelcheckbox,
  type = "text",
  placeholder = "text",
  className = "",
  defaultValue,
  onChange,
  checked,
  ss,
  ...props
}) => {
  const id = `input_${Math.random().toString(36).substring(7)}`;

  return (
    <div className={style.inputDiv} style={{ width: width, ...ss }}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={style.inputBox}
        style={{
          padding: padding,
          margin: margin,
          border: border
        }}
      >
        {type === "checkbox" ? (
          <input
            className={className}
            type={type}
            placeholder={placeholder}
            checked={checked}
            onChange={onChange}
            id={id}
            {...props}
          />
        ) : (
          <input
            className={className}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
            {...props}
          />
        )}
        {labelcheckbox && <label htmlFor={id}>{labelcheckbox}</label>}
        {props.showImage && <div className={style.imageDiv}>{props.showImage}</div>}
      </div>
    </div>
  );
};

export default Input;
