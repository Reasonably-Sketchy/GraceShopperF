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



