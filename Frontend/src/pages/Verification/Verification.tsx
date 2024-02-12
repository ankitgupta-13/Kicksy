import style from "./Verification.module.css";
import { Input, Button } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Verification = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleVerify = async (data) => {
    setError("");
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.container}>
      <h1>VERIFY OTP</h1>
      <form onSubmit={handleSubmit(handleVerify)}>
        <Input
          label="Email Verification Code"
          type="text"
          placeholder="Enter OTP"
          {...register("emailOtp", { required: true })}
        />
        <Input
          label="Phone Verification Code"
          type="text"
          placeholder="Enter OTP"
          {...register("phoneOtp", { required: true })}
        />
        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
};

export default Verification;
