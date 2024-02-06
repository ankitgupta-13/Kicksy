import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authLogin = async (payload: any) => {
  try {
    const response = await api.post("/user/login", payload);
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authRegister = async (payload: any) => {
  try {
    console.log("Something went wrong in authRegister");
    const response = await api.post("/user/register", payload);
    console.log(response);
    return response;
  } catch (error: any) {
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
