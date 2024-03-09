import { imageApi } from "./auth.api";

export const registerSeller = async (payload) => {
  try {
    const { data } = await imageApi.post("/seller/request-seller", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
