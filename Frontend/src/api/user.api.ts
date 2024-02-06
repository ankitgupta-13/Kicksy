import { api } from "./auth.api";
import { baseURL } from "./auth.api";

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`${baseURL}user/get-current-user`);
    // console.log(response);
    return response;
  } catch (error:any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
