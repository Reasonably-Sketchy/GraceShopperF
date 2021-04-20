import { callApi } from "./index";
import { addLoadingEvent, removeLoadingEvent } from '../components/utils';

// Users
export const fetchUserData = async (token) => {
    try {
        const data = await callApi({
            url: '/users/me',
            token: token,
        });
        return data;
    } catch(error) {
        console.error(error);
    };
};

// Update userData
export const updateUserData = async (token, setUserData) => {
  try {
  const data = await fetchUserData(token);
    if (data && data.username) {
        setUserData(data);
    };
  } catch (error) {
    console.error(error);
  }
};

// Fetch userCart
export const fetchUserCart = async (token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
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
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
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
export const deleteOrderProduct = async (orderProductId, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/order_products/${orderProductId}`,
      method: 'DELETE',
      token: token,
    });
    return data;
  } catch(error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
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


// Fetch product reviews (productId)
export const fetchReviews = async (productId, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/reviews/${productId}`,
    });

    if (!data) {
      console.log('No reviews exist yet for this product.');
    };
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
};

// Add a review
export const addReview = async (productId, body, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/reviews/${productId}`,
      method: 'POST',
      body: body,
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
};

// Update a review
export const editReview = async (reviewId, body, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/reviews/${reviewId}`,
      method: 'PATCH',
      body: body,
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
};

// Delete a review
export const deleteReview = async (reviewId, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/reviews/${reviewId}`,
      method: 'DELETE',
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
};

// Get user reviews
export const getUserReviews = async (userId, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url: `/users/${userId}/reviews`,
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
};

// ADMIN ROUTES
export const fetchAllUsers = async (token) => {
  try {
    const data = await callApi({
      url: "/users",
      token
    });
    return data;
  } catch (error) {
    console.error(error)
  };
};

// Orders
export const fetchAllOrders = async (token) =>{
  try {
    const data = await callApi({
      url: "/orders",
      token
    });
    return data;

  } catch (error) {
    console.error(error)
  }
}

// Update Admin Data
export const updateAdminData = async (token, setAllUsers, setAllOrders, setAllProducts) => {
  try {
    const users = await fetchAllUsers(token);
    if (setAllUsers && users && users.length > 0) {
        setAllUsers(users);
    };
  const orders = await fetchAllOrders(token);
    if (setAllOrders && orders && orders.length > 0) {
        setAllOrders(orders);
    };

  const products = await fetchAllProducts();
    if (setAllProducts && products && products.length > 0) {
        setAllProducts(products);
    };
  } catch (error) {
    console.error(error);
  }
};

// Edit Product
export const editProduct = async (productId, body, token, numLoadingEvents, setNumLoadingEvents) => {
  addLoadingEvent(numLoadingEvents, setNumLoadingEvents);
  try {
    const data = await callApi({
      url:  `/products/${productId}`,
      method: 'PATCH',
      body: body,
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    removeLoadingEvent(numLoadingEvents, setNumLoadingEvents, numLoadingEvents, setNumLoadingEvents);
  };
}

// MISC
// Render Stars
export const renderStars = (starsNum, setStars) => {
  let newArray = [];
  if (starsNum === 1) {
      newArray = [true, false, false, false, false]
  } else if (starsNum === 2) {
      newArray = [true, true, false, false, false]
  } else if (starsNum === 3) {
      newArray = [true, true, true, false, false]
  } else if (starsNum === 4) {
      newArray = [true, true, true, true, false]
  } else if (starsNum === 5) {
      newArray = [true, true, true, true, true]
  } else {
      newArray = [false, false, false, false, false]
  };
  setStars(newArray);
};