import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const OrderProduct = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-picture-container">
                <img className="product-picture" src={product.imageURL} />
            </div>
            <div className="product-data">
                <h1>{product.name}</h1>
                <h2>{product.price} USD</h2>
            </div>
        </div>
    );
};

export default OrderProduct;
