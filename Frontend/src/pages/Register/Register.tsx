import { useState } from "react";
import {authRegister } from "../../api/auth.api";
import { login } from "../../redux/reducers/authSlice.ts";
import { Input, Logo, Button } from "../../components/index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div>
      <div>
        <Logo />
      </div>
      <h2>Sign in to your account</h2>
      Don't have any account?
      <Link to="/register">Sign up</Link>
      {error && <p>{error}</p>}
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
