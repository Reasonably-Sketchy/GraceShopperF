import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Link
} from 'react-router-dom';
import { fetchUserData, fetchAllProducts, fetchUserCart } from './api/utils';

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
    SingleOrder } from './components'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#d4af37',
            main: '#b5a264',
            contrastText: 'white',

        },
        secondary: {
            main: '#222',
        },
    }
});

const App = () => {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [activeLinkIs, setActiveLinkIs] = useState('Home');
    const [cart, setCart] = useState([]);

    // Retrieve token from local storage
    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('token'));
            return;
        };

        const data = await fetchUserData(token);
        if (data && data.username) {
            setUserData(data);
        };

        const databaseCart = await fetchUserCart(token);
        if (databaseCart && databaseCart.products && databaseCart.products.length > 0) {
          const cartCopy = [...cart];
          const dbCartOrderProducts = [databaseCart.products];
          dbCartOrderProducts[0].forEach((orderProduct) => {cartCopy.push(orderProduct)});
          setCart(cartCopy);
        };
    }, [token]);

    // Retrieve all products
    useEffect(async () => {
        try {
            const products = await fetchAllProducts();
            if (products) {
                setAllProducts(products);
            };

        } catch(error) {
            console.error(error);
        };
    }, [])

    return (
        <div id="app">
            <ThemeProvider theme={theme}>
                <Header 
                    activeLinkIs = {activeLinkIs}
                    setActiveLinkIs = {setActiveLinkIs}
                    setToken = {setToken}
                    setUserData = {setUserData}
                    userData = {userData} />

                <Switch>
                    <Route exact path = "/">
                        <Home
                            userData = {userData} 
                            setActiveLinkIs = {setActiveLinkIs}/>
                    </Route>

                    <Route path = "/welcome">
                        <Welcome />
                    </Route>

                    <Route exact path = "/login">
                        <Login 
                            setToken = {setToken} />
                    </Route>

                    <Route exact path="/login/success">
                        <LoginLanding
                            userData = {userData}
                            action = {'logged in'} />
                    </Route>

                    <Route exact path ="/register">
                        <Register
                            setToken = {setToken} />
                    </Route>

                    <Route exact path="/register/success">
                        <LoginLanding
                            userData = {userData}
                            action = {'registered'} />
                    </Route>

                    <Route path="/logout">
                        <LogoutLanding />
                    </Route>

                    <Route exact path = "/products">
                        <Products allProducts = {allProducts}/>
                    </Route>

                    <Route exact path = "/products/:productId">
                        <SingleProduct allProducts = {allProducts}/>
                    </Route>

                    <Route path = "/account">
                        <Account 
                            userData = {userData} />
                    </Route>

                    {userData.isAdmin
                    ? <Route path = "/orders/:orderId">
                        <SingleOrder />
                    </Route>
                    : ''}

                    <Route path = "/cart">
                        <Cart 
                            cart = {cart} 
                            setCart = {setCart} />
                    </Route>

                </Switch>

                
            </ThemeProvider>
        </div>
    );
};

export default App;


ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root'));