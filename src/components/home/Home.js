import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import logo from '../../assets/flim-flam-logo.png';

import './Home.css';
import { KeyboardArrowRight } from '@material-ui/icons';

const Home = ({ setActiveLinkIs }) => {

    return (
        <main id="home">

<           section className="home-banner">
                <div className="header-container">
                    <h1>Welcome to</h1>
                    <img className="home-logo" src={logo} />
                </div>
            </section>

            <section className="shop-banner">
                <Link to="/products">
                    <Button
                        className="home-cta"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setActiveLinkIs("Products")
                        }}>Browse the Shoppe <KeyboardArrowRight /></Button>
                </Link>     
            </section>



            {/* <section className="home-banner about">
                <Button
                    className="home-cta"
                    variant="outlined"
                    color="primary">Shoppe</Button>
            </section> */}

        </main> 
    );
};

export default Home;