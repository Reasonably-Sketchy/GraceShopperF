import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import './Welcome.css'

const Welcome = () => {

    return (
        <main id="login-register">
            <div className="user-action-container">
                <Link to='/login'>
                    <Button
                        className="cta-large welcome"
                        variant="outlined"
                        color="primary">Login</Button>
                </Link>

                <Link to='register'>
                    <Button
                        className="cta-large welcome"
                        variant="outlined"
                        color="primary">Register</Button>
                </Link>
            </div>
        </main> 
    );
};

export default Welcome;