import { api } from "./auth.api";

export const getKey = async () => {
  try {
    const {
      data: { key },
    } = await api.get("/user/payments/get-key");
    return key;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const makePayment = async (payload) => {
  try {
    const {
      data: { data },
    } = await api.post("/user/payments/make-payment", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
