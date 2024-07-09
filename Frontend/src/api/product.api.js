import { api } from "./auth.api";

export const getProductById = async (payload) => {
  try {
    const { data } = await api.post("/user/get-product-by-id", payload);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProductRequestById = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/get-by-id",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const fetchProductOffers = async (payload) => {
  try {
    const { data } = await api.post("/product/fetch-offers", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addProductOffer = async (payload) => {
  try {
    const { data } = await api.post("seller/add-offer-to-product", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/user/get-products");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getFilteredProducts = async (payload) => {
  try {
    const { data } = await api.post("/products/filter-product", payload);
    return data;
  } catch (error) {
    console.error(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const deleteProduct = async (payload) => {
  try {
    const { data } = await api.post("/products/delete-product", payload);
    return data;
  } catch (error) {
    console.error(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
