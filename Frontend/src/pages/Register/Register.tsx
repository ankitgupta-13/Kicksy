import { useState } from "react";
import { authRegister } from "../../api/auth.api";
import { Input, Logo, Button, Select } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const handleRegister = async (data) => {
    setError("");
    try {
      const response = await authRegister(data);
      console.log(response);
      if (response.statusCode === 201 || response.statusCode === 400) {
        navigate("/verify");
      } else if (response.statusCode === 409) {
        setError(response.message);
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <Logo />
      </div>
      <h2>Sign up</h2>
      Already have an account?
      <Link to="/login">Sign up</Link>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(handleRegister)}>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your Full Name"
          {...register("username", { required: true })}
        />
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
        <div className={style.mobile}>
          <Select
            options={["+91", "+92", "+93", "+94", "+95", "+96", "+97", "+98"]}
            {...register("countryCode", { required: true })}
          />
          <Input
            label="Mobile Number"
            type="text"
            placeholder="Enter your phone number"
            {...register("mobile", { required: true })}
          ></Input>
        </div>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        {/* <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter confirmation password"
          {...register("password", { required: true })}
        /> */}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
