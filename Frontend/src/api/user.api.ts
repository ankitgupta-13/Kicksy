import axios from "axios";
import { baseURL } from "./auth.api";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${baseURL}user/get-current-user`);
    // console.log(response);
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
