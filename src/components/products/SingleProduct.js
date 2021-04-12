import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { addProductToOrder, createOrder, fetchUserCart } from '../../api/utils';

import ProductCard from './ProductCard';

// import './Products.css';
import './SingleProduct.css';

const SingleProduct = ({ allProducts, cart, setCart, token }) => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [respMessage, setRespMessage] = useState('');

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
        // IF I'M NOT LOGGED IN
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
                for (let i = 0; i < cartCopy.length; i ++) {
                    const checkedProduct = cartCopy[i];
                    if (checkedProduct.name === thisProduct.name) {
                        console.log('This item is already in your cart.');
                        return;
                    };
                };
            };

            cartCopy.push(toBeOrderProduct);
            setCart(cartCopy);
            localStorage.setItem('cart', JSON.stringify(cartCopy));
        };

        // IF I AM LOGGED IN
        if (token) {
            // try to get my cart
            let databaseCart = await fetchUserCart(token);

            // If there's nothing in the cart state, either find my empty cart or create a new order
            if (cart.length === 0) {
                // Locate the user's cart (or create one if there is none)
                if (databaseCart && databaseCart.length > 0) {
                    console.log("Existing User Cart: ", databaseCart);
                } else if (!databaseCart) {
                    databaseCart = await createOrder(token);
                    console.log("New User Cart:", databaseCart);
                };
            };

            // Add the product to the order
            const body = {
                productId: productId,
                price: thisProduct.price,
                quantity: quantity,
            };

            const newOrderProduct = await addProductToOrder(databaseCart.id, body, token);
            // window.location.reload();
            // setRespMessage(`x${quantity} ${thisProduct.name} Added to cart`);

        //     let cartCopy = [];
        //     if (cart && cart.length > 0) {
        //         cartCopy = [...cart];
        //         for (let i = 0; i < cartCopy.length; i ++) {
        //             const checkedProduct = cartCopy[i];
        //             if (checkedProduct.name === thisProduct.name) {
        //                 console.log('This item is already in your cart.');
        //                 return;
        //             };
        //         };
        //     };

        //     cartCopy.push(newOrderProduct);
        //     setCart(cartCopy);
        //     localStorage.setItem('cart', JSON.stringify(cartCopy));
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
                {respMessage ? <div>{respMessage}</div> : ''}
            </section>

        </main>
    );
};

export default SingleProduct;