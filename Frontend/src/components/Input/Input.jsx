import React, { useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} ref={ref} {...props} id={id} />
    </div>
  );
};

export default React.forwardRef(Input);
