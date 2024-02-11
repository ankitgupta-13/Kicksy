import { useState } from "react";
import { authRegister } from "../../api/auth.api";
import { login } from "../../redux/reducers/authSlice.ts";
import { Input, Logo, Button } from "../../components/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Register.module.css"

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleRegister = async (data: any) => {
    setError("");
    try {
      const response = await authRegister(data);
      if (response.status === 200) {
        const userData = response.data.data;
        console.log(userData);
        dispatch(login(userData));
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={style.Body}>
    <div className={style.CenterBody}>
      <div className={style.logo}>
        <Logo />
      </div>
      <h2 className={style.heading}>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Please enter a valid email address",
            },
          })}
        />
        <Input
          label="Mobile Number"
          type="number"
          placeholder="Enter your phone number"
          {...(register("mobile"), { required: true })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter confirmation password"
          {...register("password", { required: true })}
        />
        <Button className={style.button}
          style={{ backgroundColor: "#131313", color: "white" }}  type="submit">Register</Button>
      </form>
    </div>
    </div>
  );
};

export default Login;
