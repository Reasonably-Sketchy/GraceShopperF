import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

import './Landings.css';

// DEFAULT COMPONENT
const LogoutLanding = ({ setActiveLinkIs }) => {
    return(
        <main id="landing">
            <div className="landing-container">
                    <h1>You have been successfully logged out.</h1>
                    <h3>Come back soon.</h3>
                    <Link to="/">
                        <Button 
                            className="landing-button"
                            variant="outlined" 
                            color="primary"
                            onClick={() => {
                                setActiveLinkIs('Home')
                            }}>
                            Return Home</Button></Link>
            </div>
        </main>
    );
};

export default LogoutLanding;