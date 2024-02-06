import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const api = axios.create({
  withCredentials: true,
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authLogin = async (payload) => {
  try {
    const response = await api.post("/user/login", payload);
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authRegister = async (payload) => {
  try {
    console.log("Something went wrong in authRegister");
    const response = await api.post("/user/register", payload);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authLogout = async () => {
  try {
    const response = await api.post("/user/logout");
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
