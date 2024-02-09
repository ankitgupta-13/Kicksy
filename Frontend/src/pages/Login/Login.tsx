import { useState } from "react";
import { authLogin } from "../../api/auth.api";
import { login } from "../../redux/reducers/authSlice.ts";
import { Input, Logo, Button } from "../../components/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data: any) => {
    setError("");
    try {
      console.log(data);
      const response = await authLogin(data);
      console.log(response.data.data);
      const userData = response.data.data;
      if (userData) {
        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={style.container}>
      {/* <div>
        <Logo />
      </div> */}
      <h2>LOG IN</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(handleLogin)}>
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
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <Button bgColor="#000000" textColor="#ffffff" type="submit">
          Login
        </Button>
      </form>
      Don't have any account?
      <Link to="/register">Sign up</Link>
    </div>
  );
};

export default Login;
