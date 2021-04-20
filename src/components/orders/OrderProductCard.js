import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { deleteOrderProduct, updateOrderProduct } from '../../api/utils';

import './OrderProductCard.css'

const OrderProductCard = ({ orderProduct, cart, setCart, token }) => {
    const [quantity, setQuantity] = useState(orderProduct.quantity);
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);

    const handleQuantityChange = async (event) => {
        setQuantity(Number(event.target.value))
        // TOKEN
        if (token) {
            const body = {
                price: orderProduct.price,
                quantity: Number(event.target.value)
            };
            await updateOrderProduct(orderProduct.orderProductId, body, token, numLoadingEvents, setNumLoadingEvents);
        };

        // NO TOKEN
        const newCart = [...cart];
        const cartProductToUpdate = newCart.find((product) => {return product.name === orderProduct.name});
        cartProductToUpdate.quantity = Number(event.target.value);
        setCart(newCart);
    };

    const handleRemoveFromCart = async () => {
        // TOKEN
        if (token) {
            await deleteOrderProduct(orderProduct.orderProductId, token, numLoadingEvents, setNumLoadingEvents);
        };

        // NO TOKEN
        const newCart = [...cart];
        const cartProductIndexToRemove = newCart.findIndex((product) => {return product.name === orderProduct.name});
        newCart.splice(cartProductIndexToRemove, 1);
        setCart(newCart);
    };

    const generateProductTotal = (orderProduct) => {
        const price = orderProduct.price;
        const quantity = orderProduct.quantity;
        return Number(price) * Number(quantity);
    };
    

    return (
        <div className="order-product-card">
            <div className="order-product-image-container">
                <img src={orderProduct.imageURL} alt={orderProduct.name} />
            </div>
            <div className="order-product-description">
                <h3>{orderProduct.name}</h3>
                <p>{orderProduct.description}</p>
                <fieldset className="quantity-container">
                    <label htmlFor="quantity">Quantity:</label>
                    <input 
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}></input>
                </fieldset>

            </div>
            <div className="order-product-summary">
                <div className="price">
                    <h3>Price:</h3>
                    <h4 className="calculation"><span className="gold-text">${orderProduct.price}</span> x {orderProduct.quantity}</h4>
                    <h2 className="price-line"><span className="usd">USD</span><span className="gold-text">${generateProductTotal(orderProduct)}</span> </h2>
                </div>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleRemoveFromCart}>Remove From Cart</Button>
            </div>
            {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
        </div>
    );
};

export default OrderProductCard;
