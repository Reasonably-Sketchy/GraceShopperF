import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { deleteOrderProduct, updateOrderProduct } from '../../api/utils';

import './OrderProductCard.css'

const OrderProductCard = ({ orderProduct, cart, setCart, token }) => {

    const [quantity, setQuantity] = useState(orderProduct.quantity);

    const handleQuantityChange = async (event) => {
        setQuantity(Number(event.target.value))
        // TOKEN
        if (token) {
            const body = {
                price: orderProduct.price,
                quantity: Number(event.target.value)
            };
            const updatedOrderProduct = await updateOrderProduct(orderProduct.orderProductId, body, token);
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
            const deletedOrderProduct = await deleteOrderProduct(orderProduct.orderProductId, token);
            console.log('DELETED: ', deletedOrderProduct);
        };

        // NO TOKEN
        const newCart = [...cart];
        const cartProductIndexToRemove = newCart.findIndex((product) => {return product.name === orderProduct.name});
        newCart.splice(cartProductIndexToRemove, 1);
        console.log('NEW CART: ', newCart);
        setCart(newCart);
    }

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
                    variant="contained"
                    onClick={handleRemoveFromCart}>Remove From Cart</Button>
            </div>
        </div>
    );
};

export default OrderProductCard;
