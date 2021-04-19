import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

import './Landings.css';
import { KeyboardArrowRight } from '@material-ui/icons';

// DEFAULT COMPONENT
const LoginLanding = ({ userData, action, setActiveLinkIs }) => {
    return(
        <main id="landing">
            <div className="landing-container">
                    <h1>Welcome, <span className="gold-text">{userData.first}</span>!</h1>
                    <h3>You have successfully {action} as <span className="gold-text">{userData.username}</span>.</h3>

                    <Link to="/products">
                        <Button 
                            className="landing-button"
                            variant="contained" 
                            color="primary"
                            onClick={() => {
                                setActiveLinkIs('Products')
                            }}>
                            To the Shoppe <KeyboardArrowRight /></Button></Link>

                    <Link to="/cart">
                        <Button 
                            color="primary"
                            onClick={() => {
                                setActiveLinkIs('Cart')
                            }}>
                            View Your Cart <KeyboardArrowRight /></Button></Link>

                    <Link to="/account">
                        <Button 
                            color="primary"
                            onClick={() => {
                                setActiveLinkIs('Account')
                            }}>
                            Visit Your Dashboard <KeyboardArrowRight /></Button></Link>
            </div>
        </main>
    );
};

export default LoginLanding;