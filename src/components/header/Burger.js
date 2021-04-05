import React from 'react';

import './Burger.css';

const Burger = ({ isMenuOpen, toggleMenu }) => {

    return (
        <button 
            aria-label="Navigation"
            className="burger" 
            onClick={toggleMenu}>

            <span className="burger-top" id={isMenuOpen ? "burger-top-active" : ''}></span>
            <span className="burger-mid" id={isMenuOpen ? "burger-mid-active" : ''}></span>
            <span className="burger-bottom" id={isMenuOpen ? "burger-bottom-active" : ''}></span>
        </button>
    );
};

export default Burger;