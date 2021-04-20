import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  fetchUserData,
  fetchAllProducts,
  fetchUserCart,
  addProductToOrder,
  // fetchAllUsers,
  // fetchAllOrders,
  createOrder,
  updateUserData,
} from "./api/utils";

// Page components
import {
  Header,
  Home,
  Welcome,
  Login,
  Register,
  LoginLanding,
  LogoutLanding,
  Products,
  SingleProduct,
  Cart,
  Account,
  Admin,
  AdminOrders,
  SingleUser,
} from "./components";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./styles.css";
import { addStateCartToDB } from "./components/utils";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b5a264",
      contrastText: "white",
    },
    secondary: {
      main: "#222",
    },
  },
});

// Persistent cart
const getCartFromLocal = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
};

const setCartOnLocal = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const App = () => {
  const setCart = (currentCart) => {
    setCartOnLocal(currentCart);
    _setCart(currentCart);
  };

  useEffect(() => {
    if (getCartFromLocal()) {
      _setCart(getCartFromLocal());
    }
  }, []);

  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [activeLinkIs, setActiveLinkIs] = useState("Home");
  const [cart, _setCart] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [numLoadingEvents, setNumLoadingEvents] = useState(0);

  // Retrieve token from local storage
  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }

    const data = await fetchUserData(
      token,
      numLoadingEvents,
      setNumLoadingEvents
    );
    if (data && data.username) {
      setUserData(data);
    }

    let databaseCart = await fetchUserCart(
      token,
      numLoadingEvents,
      setNumLoadingEvents
    );
    if (!databaseCart) {
      databaseCart = await createOrder(
        token,
        numLoadingEvents,
        setNumLoadingEvents
      );
    }

    await addStateCartToDB(
      databaseCart,
      cart,
      setCart,
      addProductToOrder,
      token,
      updateUserData,
      setUserData,
      numLoadingEvents,
      setNumLoadingEvents
    );
  }, [token]);

  // Retrieve all products
  useEffect(async () => {
    try {
      const products = await fetchAllProducts(
        numLoadingEvents,
        setNumLoadingEvents
      );
      if (products) {
        setAllProducts(products);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // // Retrieve all users
  // useEffect(async ()=>{
  //     try {
  //         let users = []
  //         if (token) {
  //             users = await fetchAllUsers(token);
  //         }
  //         if (users) {
  //             setAllUsers(users);
  //         };
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }, [token]);

  // // Retrieve all orders
  // useEffect(async ()=>{
  //     try{
  //         let orders = [];
  //         if (token) {
  //             orders = await fetchAllOrders(token);
  //         };

  //         if (orders) {
  //             setAllOrders(orders);
  //         }
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }, [token])

  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Header
          activeLinkIs={activeLinkIs}
          setActiveLinkIs={setActiveLinkIs}
          setToken={setToken}
          setUserData={setUserData}
          userData={userData}
          setCart={setCart}
        />

        <Switch>
          <Route exact path="/">
            <Home userData={userData} setActiveLinkIs={setActiveLinkIs} />
          </Route>

          <Route path="/welcome">
            <Welcome />
          </Route>

          <Route exact path="/login">
            <Login setToken={setToken} />
          </Route>

          <Route exact path="/login/success">
            <LoginLanding
              userData={userData}
              action={"logged in"}
              setActiveLinkIs={setActiveLinkIs}
            />
          </Route>

          <Route exact path="/register">
            <Register setToken={setToken} />
          </Route>

          <Route exact path="/register/success">
            <LoginLanding
              userData={userData}
              action={"registered"}
              setActiveLinkIs={setActiveLinkIs}
            />
          </Route>

          <Route path="/logout">
            <LogoutLanding setActiveLinkIs={setActiveLinkIs} />
          </Route>

          <Route exact path="/products">
            <Products
              allProducts={allProducts}
              userData={userData}
              token={token}
              setAllProducts={setAllProducts}
            />
          </Route>

          <Route exact path="/products/:productId">
            <SingleProduct
              allProducts={allProducts}
              cart={cart}
              setCart={setCart}
              token={token}
              userData={userData}
              setUserData={setUserData}
              setAllProducts={setAllProducts}
            />
          </Route>

          <Route path="/account">
            <Account
              userData={userData}
              token={token}
              setActiveLinkIs={setActiveLinkIs}
              setUserData={setUserData}
            />
          </Route>

          {userData.isAdmin ? (
            <Route path="/orders">
              <AdminOrders allOrders={allOrders} />
            </Route>
          ) : (
            ""
          )}

          {userData.isAdmin ? (
            <Route path="/admin">
              <Admin
                token={token}
                setAllProducts={setAllProducts}
                allUsers={allUsers}
                userData={userData}
                setAllUsers={setAllUsers}
                setAllOrders={setAllOrders}
              />
            </Route>
          ) : (
            ""
          )}

          {userData.isAdmin ? (
            <Route path="/users/:userId">
              <SingleUser
                userData={userData}
                allUsers={allUsers}
                token={token}
                setAllUsers={setAllUsers}
              ></SingleUser>
            </Route>
          ) : (
            ""
          )}

          <Route path="/cart">
            <Cart
              userData={userData}
              setUserData={setUserData}
              cart={cart}
              setCart={setCart}
              token={token}
            />
          </Route>
        </Switch>
      </ThemeProvider>
      {numLoadingEvents > 0 ? (
        <div className="loadingMessage">Loading...</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
