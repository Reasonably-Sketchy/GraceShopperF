import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import logo from '../../assets/grace-shopper-logo.png'

import Login from './Login';

import './LoginRegister.css'

const LoginRegister = () => {

    const [userAction, setUserAction] = useState('');

    return (
        <main id="login-register">
            
            {userAction === 'Login'
            ? <Login setUserAction = {setUserAction} />
            : userAction === 'Register'
            ? <Register setUserAction = {setUserAction} />
            : <>
                <div className="header-container">
                    <h1>Welcome to</h1>
                    <img className="login-logo" src={logo} />
                </div>
                <div className="user-action-container">
                    <Button
                        className="cta-large"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setUserAction('Login')
                        }}>Login</Button>
                    <Button
                        className="cta-large"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setUserAction('Register')
                        }}>Register</Button>
                </div>
            </>
            }

        </main> 
    );
};

export default LoginRegister;