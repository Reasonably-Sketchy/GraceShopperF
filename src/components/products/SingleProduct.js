import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { addProductToOrder, createOrder, fetchReviews, fetchUserCart, updateUserData } from '../../api/utils';
import ReviewCard from '../reviews/ReviewCard';
import ReviewCreator from '../reviews/ReviewCreator';

import ProductCard from './ProductCard';

// import './Products.css';
import './SingleProduct.css';

const SingleProduct = ({ allProducts, cart, setCart, token, setUserData, userData }) => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [respMessage, setRespMessage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [creatorOpen, setCreatorOpen] = useState(false);

    useEffect(async () => {
        const productReviews = await fetchReviews(productId);
        if (productReviews) {
            setReviews(productReviews);
        };
    }, [])

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
                        setRespMessage('This item is already in your cart.');
                        return;
                    };
                };
            };

            cartCopy.push(toBeOrderProduct);
            setCart(cartCopy);
            localStorage.setItem('cart', JSON.stringify(cartCopy));
            setRespMessage('Added to cart!')
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

            // Need to update the cart
            let cartCopy = [];
            if (cart && cart.length > 0) {
                cartCopy = [...cart];
                for (let i = 0; i < cartCopy.length; i ++) {
                    const checkedProduct = cartCopy[i];
                    if (checkedProduct.name === thisProduct.name) {
                        setRespMessage('This item is already in your cart.');
                        return;
                    };
                };
            };
            cartCopy.push(newOrderProduct);
            setCart(cartCopy);
            // window.location.reload();
            setRespMessage('Added to cart!')
            await updateUserData(token, setUserData);
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
                            className="quantity-input"
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
                <div className="resp-message">
                    {respMessage ? <div className="respMessage">{respMessage}</div> : ''}
                </div>
            </section>

            <section className="reviews">
                <h2>Reviews:</h2>
                <Button
                    className="add-review"
                    variant="contained"
                    color="primary"
                    disabled={userData && userData.username ? false : true}
                    onClick={() => {
                        setCreatorOpen(true);
                    }}>Add a Review</Button>
                <div className="reviews-container">
                    {reviews && reviews.length > 0
                    ? reviews.map((review) => {
                        return (
                            <ReviewCard
                                key = {review.id} 
                                review = {review}
                                userData = {userData} />
                        );
                    })
                    : <div>No reviews to display.</div>
                    }
                </div>
            </section>

            {creatorOpen
            ? <ReviewCreator 
                token = {token}
                productId = {productId}
                setCreatorOpen = {setCreatorOpen}
                setReviews = {setReviews}/>
            : ''}
        </main>
    );
};

export default SingleProduct;