import { api, baseURL } from "./auth.api";
import axios from "axios";

export const axiosImageApi = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const createAdmin = async (payload: any) => {
  try {
    const { data } = await api.post("/admin/create-admin", payload);
    return data;
  } catch (error : any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const checkAdmin = async (payload: object) => {
  try {
    const { data } = await api.post("/admin/check-admin", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addProduct = async (payload: any) => {
  try {
    const { originalPrice, discountPercent } = payload;
    payload.price = {
      originalPrice,
      discountPercent,
    };
    delete payload.originalPrice;
    delete payload.discountPercent;
    console.log(payload);
    const { data } = await api.post("/admin/add-product", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const uploadImage = async (payload: FormData) => {
  try {
    const { data } = await axiosImageApi.post(
      "/admin/add-product-image",
      payload
    );
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await api.get("/admin/get-all-users");
    return data;
  } catch (error : any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addBlog = async (payload: any) => {
  try {
    const { data } = await axiosImageApi.post("/admin/add-blog", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/admin/get-all-products");
    return data;
  } catch (error : any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
export const getAllBlogs= async () => {
  try {
    const { data } = await api.get("/admin/fetch-blogs");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

