import { api } from "./auth.api";

export const getProductById = async (payload: { productID: string }) => {
  try {
    const { data } = await api.post("/user/get-product-by-id", payload);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
