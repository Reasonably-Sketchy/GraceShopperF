import React from 'react';

import './ProductSummary.css'

const ProductSummary = ({ orderProduct }) => {
    if (!orderProduct) {
        return <div className="loadingMessage">Loading...</div>
    };

    const generateProductTotal = (orderProduct) => {
        const price = orderProduct.price;
        const quantity = orderProduct.quantity;
        return Number(price) * Number(quantity);
    };

    return (
        <div className="product-summary-card">

            <div className="product-summary-image-container">
                <img src={orderProduct.imageURL} alt={orderProduct.name} />
            </div>

            <div className="product-summary-description">
                <h4><span className="gold-text">{orderProduct.quantity}x</span> {orderProduct.name}</h4>
            </div>

            <div className="product-summary-price">
                <h3 className="price-line"><span className="usd">USD</span><span className="gold-text">${generateProductTotal(orderProduct)}</span> </h3>
            </div>
        </div>
    );
};

export default ProductSummary;
