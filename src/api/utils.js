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

// export const logOut = () => {
//   localStorage.clear();
//   setUserData({});
//   setToken("");
//   history.push("/");
// };


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



