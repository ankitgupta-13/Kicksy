import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authLogin = async (payload: object) => {
  try {
    const response = await api.post("/user/login", payload);
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authRegister = async (payload: object) => {
  try {
    const { data } = await api.post("/user/register", payload);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authLogout = async () => {
  try {
    const response = await api.post("/user/logout");
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const sendEmailOtp = async (payload: object) => {
  try {
    const response = await api.post("/user/send-email-otp", payload);
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const sendMobileOtp = async (payload: object) => {
  try {
    const response = await api.post("/user/send-mobile-otp", payload);
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authVerifyEmail = async (payload: object) => {
  try {
    const response = await api.post("/user/verify-email-otp", payload);
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authVerifyMobile = async (payload: object) => {
  try {
    const response = await api.post("/user/verify-mobile-otp", payload);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
