import { callApi } from "./index";

// Users
export const fetchUserData = async () => {

    try {
        const data = await callApi({
            url: '/users/me',
        });
        return data;
    } catch(error) {
        console.error(error);
    };
};

// export const logOut = () => {
//   localStorage.clear();
//   setUserData({});
//   setToken("");
//   history.push("/");
// };


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



