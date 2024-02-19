import { useState } from "react";
import {
  authRegister,
  sendEmailOtp,
  sendMobileOtp,
  verifyEmailOtp,
  verifyMobileOtp,
} from "../../api/auth.api";
import { Input, Button, Select, Container } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const isValidEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setIsEmailValid(isValidEmail);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const isValidPhone = phone.match(/^[0-9]{10}$/g);
    setIsPhoneValid(isValidPhone);
  };

  const handleSendEmailOtp = async (email: String) => {
    const response = await sendEmailOtp({ email });
    if (response.statusCode === 200) {
      setEmailOtpSent(true);
      alert("OTP sent to your email");
    } else setError(response.message);
  };

  const handleVerifyEmailOtp = async (email: String, otp: String) => {
    const response = await verifyEmailOtp({ email, otp });
    if (response.statusCode === 200) {
      setEmailOtpVerified(true);
      alert("Email Verified");
    } else setError(response.message);
  };

  const handleSendPhoneOtp = async (mobile, countryCode) => {
    const response = await sendMobileOtp({ mobile, countryCode });
    if (response.statusCode === 200) {
      setPhoneOtpSent(true);
      alert("OTP sent to your mobile");
    } else setError(response.message);
  };

  const handleVerifyPhoneOtp = async (countryCode, mobile, otp) => {
    const response = await verifyMobileOtp({ countryCode, mobile, otp });
    if (response.statusCode === 200) {
      setPhoneOtpVerified(true);
      alert("Phone Verified");
    } else setError(response.message);
  };

  const handleRegister = async (data) => {
    setError("");
    try {
      if (!emailOtpVerified || !phoneOtpVerified) {
        alert("Please verify your email and phone");
        setError("Please verify your email and phone");
        return;
      }
      const response = await authRegister(data);
      if (response.statusCode === 201) {
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.CenterBody}>
        <h2 className={style.heading}>REGISTER</h2>
        <form onSubmit={handleSubmit(handleRegister)} className={style.form}>
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
              validate: (value) => {
                const isValidEmail = value.match(
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );
                setIsEmailValid(isValidEmail);
                return true; // Always return true to avoid validation error
              },
            })}
            onChange={handleEmailChange} // Call handleEmailChange on input change
            showImage={emailOtpVerified ? <FaCheckCircle /> : null}
          />
          {!emailOtpVerified ? (
            !emailOtpSent ? (
              <button onClick={() => handleSendEmailOtp(watch("email"))}>
                Send OTP
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <button
                  onClick={() => handleVerifyEmailOtp(watch("email"), emailOtp)}
                >
                  Verify
                </button>
              </div>
            )
          ) : null}
          <div className={style.mobile}>
            <Select
              height="55px"
              options={["+91", "+92", "+93", "+94", "+95", "+96", "+97", "+98"]}
              {...register("countryCode", { required: true })}
            />
            <Input
              type="number"
              placeholder="Enter your mobile number"
              {...register("mobile", {
                required: true,
                validate: (value) => {
                  const isValidPhone = value.match(/^[0-9]{10}$/g);
                  setIsPhoneValid(isValidPhone);
                  return true; // Always return true to avoid validation error
                },
              })}
              onChange={handlePhoneChange} // Call handlePhoneChange on input change
              showImage={phoneOtpVerified ? <FaCheckCircle /> : null}
            />
          </div>
          {!phoneOtpVerified ? (
            !phoneOtpSent ? (
              <button
                onClick={() =>
                  handleSendPhoneOtp(watch("phone"), watch("countryCode"))
                }
              >
                Send OTP
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setPhoneOtp(e.target.value)}
                />
                <button
                  onClick={() =>
                    handleVerifyPhoneOtp(
                      watch("countryCode"),
                      watch("phone"),
                      phoneOtp
                    )
                  }
                >
                  Verify
                </button>
              </div>
            )
          ) : null}
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <img
            src={showPassword ? <IoMdEye /> : <IoIosEyeOff />}
            onClick={() => setShowPassword(!showPassword)}
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
                } else {
                  setPasswordError("");
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
    </Container>
  );
};

export default Register;
