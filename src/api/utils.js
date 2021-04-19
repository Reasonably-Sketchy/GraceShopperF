import { callApi } from "./index";

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
  const data = await fetchUserData(token);
    if (data && data.username) {
        setUserData(data);
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

// Users
export const fetchAllUsers = async (token) => {
  try {
    const data = await callApi({
      url: "/users",
      token
    });
    console.log('data fetch users line 51 utils', data)

    return data;
  } catch (error) {
    console.error(error)
  };
};

// Products
export const fetchAllProducts = async (token) => {
    try {
      const data = await callApi({
        url: "/products",
        token
      });
  
      return data;
    } catch (error) {
      console.error(error);
    };
};

// Orders
export const fetchAllOrders = async (token) =>{
  try {
    const data = await callApi({
      url: "/orders",
      token
    });
    console.log('data in utils line 80', data)
    return data;

  } catch (error) {
    console.error(error)
  }
}

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


// Fetch product reviews (productId)
export const fetchReviews = async (productId) => {
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
  };
};

// Add a review
export const addReview = async (productId, body, token) => {
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
  };
};

// Update a review
export const editReview = async (reviewId, body, token) => {
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
  };
};

// Delete a review
export const deleteReview = async (reviewId, token) => {
  try {
    const data = await callApi({
      url: `/reviews/${reviewId}`,
      method: 'DELETE',
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  };
};

// Get user reviews
export const getUserReviews = async (userId, token) => {
  console.log('UserId', userId)
  try {
    const data = await callApi({
      url: `/users/${userId}/reviews`,
      token: token,
    });

    return data;
  } catch (error) {
    console.error(error);
  };
};

// ADMIN ROUTES
export const fetchAllUsers = async (token) => {
  try {
    const data = await callApi({
      url: "/users",
      token
    });
    console.log('data fetch users line 51 utils', data)

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
    console.log('data in utils line 80', data)
    return data;

  } catch (error) {
    console.error(error)
  }
}

// Update Admin Data
export const updateAdminData = async (token, setAllUsers, setAllOrders) => {
  const users = await fetchAllUsers(token);
    if (setAllUsers && users && users.length > 0) {
        setAllUsers(users);
    };
  const orders = await fetchAllOrders(token);
    if (setAllOrders && orders && orders.length > 0) {
        setAllOrders(orders);
    };
};


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