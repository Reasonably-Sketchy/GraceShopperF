import { callApi } from "./index";

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



