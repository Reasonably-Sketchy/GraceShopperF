import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

import ProductCard from './ProductCard';

// import './Products.css';
import './SingleProduct.css';

const SingleProduct = ({ allProducts, cart, setCart, token }) => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    if (!allProducts) {
        return <h1>Loading...</h1>
    };

    const thisProduct = allProducts.find((product) => {return product.id == productId})

    if (!thisProduct) {
        return <h1>This product does not exist.</h1>
    };
    
    const handleQuantityChange = async (event) => {
        setQuantity(Number(event.target.value))
    };

    const handleAddToCart = async () => {
        // If no token, create an "order-product" object: {(id), name, description, imageURL, price, quantity}
        // If token && cart.length === 0, need to create a new order
         
        // when creating an order, i need a userId and a status
        // when adding a product to an order, i need productId, price, quantity in the body and the orderId
        if (!token) {
            const toBeOrderProduct = {
                productId: thisProduct.id,
                name: thisProduct.name,
                description: thisProduct.description,
                imageURL: thisProduct.imageURL,
                price: thisProduct.price,
                quantity: quantity,
            };
            let cartCopy = [];
            if (cart && cart.length > 0) {
                cartCopy = [...cart];
            };
            cartCopy.push(toBeOrderProduct);
            setCart(cartCopy);
            localStorage.setItem('cart', JSON.stringify(cartCopy));
        };

    };

    return (
        <main id="single-product">
            <section className="single-product-image-container">
                <img src={thisProduct.imageURL} />
            </section>

            <section className="single-product-description">
                <h1>{thisProduct.name}</h1>
                <h3 className="description">{thisProduct.description}</h3>
                <h3><span className="gold-text">{thisProduct.price}</span> USD</h3>
                
                <div className="action-container">

                    <fieldset className="quantity-container">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            name="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}></input>
                    </fieldset>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddToCart}>Add to Cart</Button>
                </div>

            </section>

        </main>
    );
};

export default SingleProduct;