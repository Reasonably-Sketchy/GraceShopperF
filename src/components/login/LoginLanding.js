import React from 'react';
import {Link} from 'react-router-dom';

// IMAGE IMPORTS
// import artwork from './site-images/logout-artwork.png';

// MUI IMPORTS
import {Button} from '@material-ui/core';

import './Landings.css';
import { KeyboardArrowRight } from '@material-ui/icons';

// DEFAULT COMPONENT
const LoginLanding = ({ userData, action }) => {
    return(
        <main id="landing">
            <div className="landing-container">
                {/* <img src={artwork}/> */}
                    <h1>Welcome, <span className="gold-text">{userData.first}</span>!</h1>
                    <h3>You have successfully {action} as <span className="gold-text">{userData.username}</span>.</h3>

                    <Link to="/products">
                        <Button 
                            className="landing-button"
                            variant="contained" 
                            color="primary">
                            To the Shoppe <KeyboardArrowRight /></Button></Link>

                    {/* TO CART */}
                    <Link to="/">
                        <Button 
                            color="primary">
                            View Your Cart <KeyboardArrowRight /></Button></Link>

                    <Link to="/account">
                        <Button 
                            color="primary">
                            Visit Your Dashboard <KeyboardArrowRight /></Button></Link>
            </div>
        </main>
    );
};

export default LoginLanding;