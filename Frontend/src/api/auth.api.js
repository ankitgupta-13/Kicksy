import axios from "axios";

export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: baseURL,
  // timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const imageApi = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const authLogin = async (payload) => {
  try {
    const { data } = await api.post("/user/login", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authRegister = async (payload) => {
  try {
    const { data } = await api.post("/user/register", payload);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authLogout = async () => {
  try {
    const { data } = await api.post("/user/logout");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const sendEmailOtp = async (payload) => {
  try {
    const { data } = await api.post("/user/send-email-otp", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const verifyEmailOtp = async (payload) => {
  try {
    const { data } = await api.post("/user/verify-email-otp", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const sendMobileOtp = async (payload) => {
  try {
    const { data } = await api.post("/user/send-mobile-otp", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const verifyMobileOtp = async (payload) => {
  try {
    const { data } = await api.post("/user/verify-mobile-otp", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
