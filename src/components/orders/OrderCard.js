import React from 'react';

import './OrderCard.css';

const OrderCard = ({ order }) => {
    // Generates total price for product based on quantity
    if (order && order.products && order.products.length > 0) {
        const productTotals = order.products.map((product) => {
            const quantity = product.quantity;
            const price = product.price;
            const total = (Number(quantity) * Number(price));
            product.total = total;
            return total;
        });
        order.total = productTotals.reduce((total, num) => {return total + num});
    };

    return (
        <div className="order-card">
            <div className="order-header">
                    <h4>Order <span className="gold-text">#{order.id}</span></h4>
                    <h4>Date Placed: <span className="gold-text">{order.datePlaced ? order.datePlaced : '--'}</span></h4>
            </div>

            <div className="order-data">
                <div className="data-pair">
                    <h4>Customer ID:</h4>
                    <h3>{order.userId}</h3>
                </div>

                <div className="data-pair">
                    <h4>Status: </h4>
                    <h3>{order.status}</h3>
                </div>

                <div className="data-pair">
                    <h4>Products: </h4>
                    <h3>{order.products.length}</h3>
                </div>

                <div className="data-pair">
                    <h4>Total: </h4>
                    <h3>${order.total}</h3>
                </div> 
            </div>
        </div>
    );
};

export default OrderCard;