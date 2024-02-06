import axios from "axios";
import { api, baseURL } from "./auth.api";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/get-current-user");
    return response;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
