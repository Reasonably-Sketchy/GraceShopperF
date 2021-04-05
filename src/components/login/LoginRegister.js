import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/grace-shopper-logo.png'

import './LoginRegister.css'

const LoginRegister = () => {
    return (
        <main id="login-register">
            <h1>Welcome to</h1>
            <img className="login-logo" src={logo} />
            <div className="user-action-container">
                <Button
                    className="cta-large"
                    variant="outlined"
                    color="primary">Login</Button>
                <Button
                    className="cta-large"
                    variant="outlined"
                    color="primary">Register</Button>
            </div>
        </main> 
    );
};

export default LoginRegister;