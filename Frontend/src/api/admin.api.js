import { api, imageApi } from "./auth.api";

export const createAdmin = async (payload) => {
  try {
    const { data } = await api.post("/admin/create-admin", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const checkAdmin = async (payload) => {
  try {
    const { data } = await api.post("/admin/check-admin", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addProduct = async (payload) => {
  try {
    const { originalPrice, discountPercent } = payload;
    payload.price = {
      originalPrice,
      discountPercent,
    };
    delete payload.originalPrice;
    delete payload.discountPercent;
    console.log(payload);
    const { data } = await api.post("/admin/add-product", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const uploadImage = async (payload) => {
  try {
    const { data } = await imageApi.post("/admin/add-product-image", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getUsers = async (page) => {
  try {
    const { data } = await api.get(`/admin/get-users?page=${page}?limit=10`);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addBlog = async (payload) => {
  try {
    const { data } = await imageApi.post("/admin/add-blog", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const attachProductToBlog = async (productArray, blogID) => {
  try {
    const response = await api.post("/admin/attach-product-to-blog", {
      productArray,
      blogID,
    });
    return response.data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProducts = async (page) => {
  try {
    const { data } = await api.get(`/admin/get-products?page=${page}?limit=10`);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await api.get("/admin/fetch-blogs");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalActiveUsers = async () => {
  try {
    const { data } = await api.get("/admin/total-active-users");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalUsersCount = async () => {
  try {
    const { data } = await api.get("/admin/total-users-count");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalProductsCount = async () => {
  try {
    const { data } = await api.get("/admin/total-products-count");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const deleteProduct = async (payload) => {
  try {
    const { data } = await api.post("/admin/delete-product", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellers = async () => {
  try {
    const { data } = await api.get("/admin/get-sellers");
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellerById = async (payload) => {
  try {
    const { data } = await api.post("/admin/get-seller/id", payload);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellerRequests = async () => {
  try {
    const { data } = await api.get("/admin/requests/seller/getAll");
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const acceptSellerRequest = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/seller/accept-request",
      payload
    );
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const declineSellerRequest = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/seller/decline-request",
      payload
    );
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const acceptProductRequest = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/accept-request",
      payload
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const declineProductRequest = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/decline-request",
      payload
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProductRequests = async () => {
  try {
    const { data } = await api.get("/admin/requests/product/getAll");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const updateProduct = async (payload) => {
  try {
    console.log(payload);
    const { data } = await api.post("/admin/update-product", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (payload) => {
  try {
    const { data } = await api.post("/user/fetch-by-id", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellerRequestById = async (payload) => {
  try {
    // console.log(payload);
    const { data } = await api.post(
      "/admin/requests/seller/get-by-id",
      payload
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const banUser = async (payload) => {
  try {
    const { data } = await api.post("/admin/ban-user", payload);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const removeBanUser = async (payload) => {
  try {
    const { data } = await api.post("/admin/remove-ban-user", payload);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await api.get("/admin/get-all-orders");
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
