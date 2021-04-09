import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import logo from '../../assets/flim-flam-logo.png';

import './Welcome.css'

const Welcome = () => {

    return (
        <main id="login-register">
            <div className="header-container">
                <h1>Welcome to</h1>
                <img className="login-logo" src={logo} />
            </div>
            <div className="user-action-container">
                <Link to='/login'>
                    <Button
                        className="cta-large"
                        variant="outlined"
                        color="primary">Login</Button>
                </Link>

                <Link to='register'>
                    <Button
                        className="cta-large"
                        variant="outlined"
                        color="primary">Register</Button>
                </Link>
            </div>
        </main> 
    );
};

export default Welcome;