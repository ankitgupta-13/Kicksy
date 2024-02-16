import { api } from "./auth.api";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/get-current-user");
    return response;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/user/get-all-products");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
