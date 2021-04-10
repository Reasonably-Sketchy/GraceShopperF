import React from 'react';
import {Link} from 'react-router-dom';

// IMAGE IMPORTS
// import artwork from './site-images/logout-artwork.png';

// MUI IMPORTS
import {Button} from '@material-ui/core';

import './Landings.css';

// DEFAULT COMPONENT
const LogoutLanding = () => {
    return(
        <main id="landing">
            <div className="landing-container">
                {/* <img src={artwork}/> */}
                    <h1>You have been successfully logged out.</h1>
                    <h3>Come back soon.</h3>
                    <Link to="/">
                        <Button 
                            className="landing-button"
                            variant="outlined" 
                            color="primary">
                            Return Home</Button></Link>
            </div>
        </main>
    );
};

export default LogoutLanding;