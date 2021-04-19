import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

const ProductSearch = ({ query, setQuery }) => {
    return (
        // <fieldset 
        //     className="product-search">
        //     <label htmlFor="product-search"></label>
        //     <input 
        //         id="product-search"                         
        //         type="text" 
        //         placeholder="Search products..."
        //         value={query}
        //         onChange={(event) => {setQuery(event.target.value)}}/>
        // </fieldset>
        <fieldset className="product-search">
            <TextField
                id="product-search"
                placeholder="Search products..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}/>
        </fieldset>

    );
};

export default ProductSearch;