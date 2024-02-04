import axios from "axios";

export const baseURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${localStorage.getItem("doc-token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authLogin = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const authRegister = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
