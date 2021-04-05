import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Link
} from 'react-router-dom';
import { fetchAllProducts } from './api/utils';

// Page components
import { 
    Header,
    Products,
    SingleProduct } from './components'

import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './styles.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#d4af37',
            main: '#b5a264',
        },
        secondary: {
            main: '#ffffff',
        },
    }
});


const App = () => {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    // Retrieve token from local storage
    // useEffect(async () => {
    //     if (!token) {
    //         setToken(localStorage.getItem('token'));
    //         return;
    //     };
    //     const data = await fetchUserData(token);
    //     if (data && data.username) {
    //         setUserData(data);
    //         console.log('USER DATA', data);
    //     };
    // }, [token])

    // Retrieve all products
    useEffect(async () => {
        try {
            const products = await fetchAllProducts();
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

                    <Route exact path = "/products">
                        <Products allProducts = {allProducts}/>
                    </Route>

                    <Route exact path = "/products/:productId">
                        <SingleProduct allProducts = {allProducts}/>
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