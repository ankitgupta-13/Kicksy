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
export const addToCart = async (payload: {
  userID: string;
  productID: string;
}) => {
  try {
    console.log(payload);
    const { data } = await api.post("/user/add-to-cart", payload);
    return data;
  } catch (error: any) {
    console.log(error);
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
