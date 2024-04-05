import { api } from "./auth.api";

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/user/get-current-user");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const findByEmail = async (payload: { email: String }) => {
  try {
    const { data } = await api.post("/user/fetch-by-email", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addToCart = async (payload: {
  userID: string;
  productID: string;
  sellerID: string;
}) => {
  try {
    console.log(payload);
    const { data } = await api.post("/user/add-to-cart", payload);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const removeFromCart = async (payload: {
  userID: String;
  productID: String;
  sellerID: String;
}) => {
  try {
    const { data } = await api.post("/user/remove-from-cart", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const updateCart = async (payload: {
  userID: String;
  productID: String;
  sellerID: String;
  operator: String;
}) => {
  try {
    const { data } = await api.post(
      "/user/add-subtract-cart-quantity",
      payload
    );
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getRecentProducts = async () => {
  try {
    const { data } = await api.get("/user/get-recent-products");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/user/get-products");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await api.get("/user/fetch-blogs");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getUserCartItems = async (payload) => {
  try {
    const { data } = await api.post("/user/get-user-cart", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
export const getBlogById = async (payload: { productID: string }) => {
  try {
    const { data } = await api.post("/user/fetch-blog-by-id", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const searchProducts = async (payload: { search_string: string }) => {
  try {
    const { data } = await api.post("/user/search-products", payload);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
