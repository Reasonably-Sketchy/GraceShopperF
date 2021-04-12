import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import './OrderProductCard.css'

const OrderProductCard = ({ orderProduct, updatedCart, setUpdatedCart }) => {

    console.log('Card product', orderProduct)
    const [quantity, setQuantity] = useState(orderProduct.quantity);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        const newCart = [...updatedCart];
        // console.log(newCart);
    }

    useEffect(()=> {
        console.log('QUANTITY UPDATED');
        const newCart = [...updatedCart];
        const productToUpdate = {...orderProduct};
        productToUpdate.quantity = Number(quantity);
        console.log('Updated product: ', productToUpdate)

    }, [quantity]);

    return (
        <div className="order-product-card">
            <div className="order-product-image-container">
                <img src={orderProduct.imageURL} alt={orderProduct.name} />
            </div>
            <div className="order-product-description">
                <h3>{orderProduct.name}</h3>
                <p>{orderProduct.description}</p>
                <fieldset className="quantity-container">
                    <label for="quantity">Quantity:</label>
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
