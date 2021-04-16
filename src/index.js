import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Link
} from 'react-router-dom';
import { fetchUserData, fetchAllProducts, fetchUserCart, addProductToOrder, createOrder, updateUserData } from './api/utils';

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
    SingleOrder,
    Admin, } from './components'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.css';
import { addStateCartToDB } from './components/utils';

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

// Persistent cart
const getCartFromLocal = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    };
};

const setCartOnLocal = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const App = () => {

    const setCart = (currentCart) => {
        setCartOnLocal(currentCart);
        _setCart(currentCart);
    }

    useEffect(() => {
        if (getCartFromLocal()) {
            _setCart(getCartFromLocal());
        };
    }, []);

    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [activeLinkIs, setActiveLinkIs] = useState('Home');
    const [cart, _setCart] = useState([]);

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

        let databaseCart = await fetchUserCart(token);
        console.log('MY OLD CART PRODUCTS: ', cart);
        if (!databaseCart) {
            databaseCart = await createOrder(token);
            console.log('New User Cart: ', databaseCart);
        };

        await addStateCartToDB(databaseCart, cart, setCart, addProductToOrder, token, updateUserData, setUserData);
    }, [token]);

    // Retrieve all products
    useEffect(async () => {
        try {
            const products = await fetchAllProducts();
            if (products) {
                setAllProducts(products);
            };
            // setCart(localStorage.getItem('cart'))
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
                    userData = {userData}
                    setCart = {setCart} />

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
                            action = {'logged in'}
                            setActiveLinkIs = {setActiveLinkIs} />
                    </Route>

                    <Route exact path ="/register">
                        <Register
                            setToken = {setToken} />
                    </Route>

                    <Route exact path="/register/success">
                        <LoginLanding
                            userData = {userData}
                            action = {'registered'}
                            setActiveLinkIs = {setActiveLinkIs} />
                    </Route>

                    <Route path="/logout">
                        <LogoutLanding setActiveLinkIs = {setActiveLinkIs} />
                    </Route>

                    <Route exact path = "/products">
                        <Products allProducts = {allProducts}/>
                    </Route>

                    <Route exact path = "/products/:productId">
                        <SingleProduct 
                            allProducts = {allProducts}
                            cart = {cart}
                            setCart = {setCart}
                            token = {token}
                            setUserData = {setUserData}
                            userData = {userData}/>
                    </Route>

                    <Route path = "/account">
                        <Account 
                            userData = {userData}
                            token = {token}
                            setActiveLinkIs = {setActiveLinkIs} />
                    </Route>

                    {userData.isAdmin
                    ? <Route path = "/orders/:orderId">
                        <SingleOrder />
                    </Route>
                    : ''}

                    {userData.isAdmin
                    ? <Route path = "/admin">
                        <Admin />
                    </Route>
                    : '' }

                    <Route path = "/cart">
                        <Cart 
                            userData = {userData}
                            setUserData = {setUserData}
                            cart = {cart} 
                            setCart = {setCart}
                            token = {token} />
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