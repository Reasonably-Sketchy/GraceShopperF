import { callApi } from "./index";

// Users
export const fetchUserData = async (token) => {

    try {
        const data = await callApi({
            url: '/users/me',
            token: token
        });
        return data;
    } catch(error) {
        console.error(error);
    };
};

// Fetch userCart
export const fetchUserCart = async (token) => {
  try {
    const userCart = await callApi({
      url: '/orders/cart',
      token: token
    });
    return userCart;
  } catch(error) {
    console.error(error);
  };
};

// Products
export const fetchAllProducts = async () => {
    try {
      const data = await callApi({
        url: "/products",
      });
  
      return data;
    } catch (error) {
      console.error(error);
    };
};

// Update order product
export const updateOrderProduct = async (orderProductId, body, token) => {
  try {
    const data = await callApi({
      url: `/order_products/${orderProductId}`,
      method: 'PATCH',
      body: body,
      token: token,
    });
    return data;
  } catch(error) {
    console.error(error);
  };
};

