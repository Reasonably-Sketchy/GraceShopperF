import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Link
} from 'react-router-dom';

// Page components
// import { } from './index';

import '../styles.css';

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
    // useEffect(async () => {
    //     try {
    //     } catch(error) {
    //         console.error(error);
    //     };
    // }, [])

    return (
        <div id="app">
            <h1>Grace Shopper</h1>
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