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
      token: token,
    });
    
    if (userCart.name === "Error") {
      console.log('No active user cart.')
      return;
    };

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

// Create a new order (cart)
export const createOrder = async (token) => {
  try {
    const params = {
      url: "/orders",
      method: "POST",
    };

    if (token) {
      params.token = token;
    };

    const data = await callApi(params);

    return data;
  } catch(error) {
    console.error(error);
  };
};

// Add product to order (create orderProduct)
export const addProductToOrder = async (orderId, body, token) => {
  try {
    const newOrderProduct = await callApi({
      url: `/orders/${orderId}/products`,
      method: 'POST',
      body: body,
      token: token,
    });
    return newOrderProduct;
  } catch(error) {
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

// Delete order product
export const deleteOrderProduct = async (orderProductId, token) => {
  try {
    const data = await callApi({
      url: `/order_products/${orderProductId}`,
      method: 'DELETE',
      token: token,
    });
    return data;
  } catch(error) {
    console.error(error);
  };
};

// Update an order (change to "complete")
export const updateOrder = async (orderId, body, token) => {
  try {
    const data = await callApi({
      url: `/orders/${orderId}`,
      method: 'PATCH',
      body: body,
      token: token,
    });
    return data;
  } catch (error) {
    console.error(error);
  };
};
