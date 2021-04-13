import React, { useState, useEffect } from 'react';

import LogoButton from './LogoButton';
import NavList from './NavList';
import Burger from './Burger';
import './Header.css';

const Header = ({ 
    activeLinkIs, 
    setActiveLinkIs, 
    setToken, 
    setUserData, 
    userData,
    setCart }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [clientWidth, setClientWidth] = useState(0);

    const changeActiveLink = (url, setActiveLinkIs) => {
        // if (url === 'http://localhost:3000/' || url === 'https://our-url.com/')
        if (url === 'http://localhost:3001/') {
            setActiveLinkIs("Home")
        };
        
        if (url.includes('/products')) {
            setActiveLinkIs("Products")
        };
    
        if (url.includes('/account')) {
            setActiveLinkIs("Account")
        };
    
        if (url.includes('/admin')) {
            setActiveLinkIs("Admin")
        };

        if (url.includes('/welcome') || url.includes('/login') || url.includes('/register')) {
            setActiveLinkIs("Welcome")
        };

        if (url.includes('/cart')) {
            setActiveLinkIs("Cart")
        };
    };

    useEffect(() => {
        setClientWidth(window.innerWidth);
        changeActiveLink(window.location.href, setActiveLinkIs);
    });

    return (
        <header id="header">
            <LogoButton />
            <NavList 
                setToken={setToken}
                setUserData={setUserData}
                isMenuOpen = {isMenuOpen} 
                toggleMenu = {toggleMenu}
                activeLinkIs = {activeLinkIs}
                userData = {userData}
                setCart = {setCart} 
                />
            
            <Burger 
                isMenuOpen = {isMenuOpen} 
                toggleMenu = {toggleMenu} />
        </header>
    );
};

export default Header;