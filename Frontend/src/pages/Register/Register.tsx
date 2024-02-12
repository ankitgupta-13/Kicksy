import { useState } from "react";
import { authRegister } from "../../api/auth.api";
import { Input, Logo, Button, Select } from "../../components/index.ts";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleRegister = async (data) => {
    setError("");
    try {
      const response = await authRegister(data);
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
    <div className={style.Body}>
      <div className={style.CenterBody}>
        <div className={style.logo}>
          <Logo />
        </div>
        <h2 className={style.heading}>Register</h2>
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
                matchPattern: (value) => {
                  if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                    return true;
                  } else {
                    setEmailError("Please enter a valid email address");
                    return "Invalid Email";
                  }
                },
              },
            })}
          />
          {emailError && <p className={style.error}>{emailError}</p>}
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
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter confirmation password"
            {...register("confirm-password", {
              required: true,
              validate: (value) => {
                if (value !== watch("password")) {
                  setPasswordError("Password does not match");
                  return "Password does not match";
                }
                return true;
              },
            })}
          />
          {passwordError && <p className={style.error}>{passwordError}</p>}
          <Button
            className={style.button}
            style={{ backgroundColor: "#131313", color: "white" }}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
