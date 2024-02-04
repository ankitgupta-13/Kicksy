import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="">Fullname</label>
      <input type="text" />
      <label htmlFor="">Email</label>
      <input type="email" />
      <label htmlFor="">Mobile</label>
      <input type="number" />
      <label htmlFor="">Password</label>
      <input type="password" />
      <label htmlFor="">Confirm Password</label>
      <input type="password" />
    </div>
  );
};

export default Register;
