import React, {useEffect, useState} from 'react';

import './ProductCard.css';

const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="product-picture-container">
                <div className="product-picture"></div>
            </div>
            <div className="product-data">
                <h1>Product Name</h1>
                <h2>500 USD</h2>
            </div>
        </div>
    );
};

export default ProductCard;
