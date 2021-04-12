import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { updateOrderProduct } from '../../api/utils';

import './OrderProductCard.css'

const OrderProductCard = ({ orderProduct, cart, setCart, token }) => {

    const [quantity, setQuantity] = useState(orderProduct.quantity);

    const handleQuantityChange = async (event) => {
        setQuantity(Number(event.target.value))
        if (token) {
            const body = {
                price: orderProduct.price,
                quantity: Number(event.target.value)
            };
            const updatedOrderProduct = await updateOrderProduct(orderProduct.id, body, token);
        };

        const newCart = [...cart];
        const cartProductToUpdate = newCart.find((product) => {return product.id === orderProduct.id});
        cartProductToUpdate.quantity = Number(event.target.value);
        setCart(newCart);
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
                <Button
                    color="primary"
                    variant="contained">Remove From Cart</Button>
            </div>
        </div>
    );
};

export default OrderProductCard;
