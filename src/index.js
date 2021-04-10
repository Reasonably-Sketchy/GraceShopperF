import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Link
} from 'react-router-dom';
import { fetchUserData, fetchAllProducts } from './api/utils';

// Page components
import { 
    Header,
    Welcome,
    Login,
    Register,
    Products,
    SingleProduct,
    Account,
    SingleOrder, 
} from './components'

import Cart from './components/cart/Cart.js'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#d4af37',
            main: '#b5a264',
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
    }, [token])

    // Retrieve all products
    useEffect(async () => {
        try {
            const products = await fetchAllProducts(token);
            console.log('Products: ', products);
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
                <Header />
                {/* <h1>Grace Shopper</h1> */}

                <Switch>

                    <Route path = "/welcome">
                        <Welcome />
                    </Route>

                    <Route path = "/login">
                        <Login 
                            setToken = {setToken} />
                    </Route>

                    <Route path ="/register">
                        <Register
                            setToken = {setToken} />
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
                        <Cart cart={cart} setCart={setCart}/>
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