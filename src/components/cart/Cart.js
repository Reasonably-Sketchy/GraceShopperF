import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import OrderProductCard from "../orders/OrderProductCard";
import axios from 'axios';

import "./Cart.css";
import { Button } from "@material-ui/core";
import { createOrder, updateOrder, updateUserData } from "../../api/utils";

const STRIPE_KEY = 'pk_test_51IemByGFMkmVlUo2ZadMmHIIQKtbGWn2OdYjCM2aOLy0JVMa5WajgLBi5qAeg2dj90cmmfpb9Rcp8Ycb2FxXmVGp00le6ddDto';
const CURRENCY = 'USD';
const PAYMENT_URL = 'https://sketch-shoppe-backend.herokuapp.com/api/pay';

const generateItemsTotal = (cart) => {
    if (cart && cart.length > 0) {
        const productTotals = cart.map((product) => {
            const quantity = product.quantity;
            return quantity;
        });
        return productTotals.reduce((total, num) => {return total + num});
    };
};

const generateOrderTotal = (cart) => {
    if (cart && cart.length > 0) {
        const productTotals = cart.map((product) => {
            const quantity = product.quantity;
            const price = product.price;
            const total = (Number(quantity) * Number(price));
            return total;
        });
        return productTotals.reduce((total, num) => {return total + num});
    };
};

const handleCompleteOrder = async (userId, orderId, setCart, token, setUserData) => {
    // IF TOKEN
    if (token) {
        const body = {
            userId: userId,
            status: 'completed'
        };

        try {
            await updateOrder(orderId, body, token);
            setCart([]);
            await updateUserData(token, setUserData);
        } catch (error) {
            console.error(error);
        };
    };

    // IF NO TOKEN
    if (!token) {
        // create an order
        await createOrder();
        setCart([]);        
    };
};

const Cart = ({ userData, setUserData, cart, setCart, token }) => {
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);
    const items = generateItemsTotal(cart);
    const orderTotal = generateOrderTotal(cart);
    const userToken = token;

    let orderId;
    let userId;
    if (userData && userData.cart) {
        orderId = userData.cart.id;
        userId = userData.id;
    };

    const onToken = (amount) => async (token) => {
        try {
            const response = await axios.post(PAYMENT_URL, {
                source: token.id,
                currency: CURRENCY,
                amount,
            });
            console.log('Payment Success!', response);
            await handleCompleteOrder(userId, orderId, setCart, userToken, setUserData);

        } catch (error) {
            console.error(error);
        };
    };

    return (
        <main id="cart">

            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Shopping Cart</h1>
                </section>
            </div>
            
            <section className="cart-page-display">

                {cart && cart.length > 0
                ? cart.map((orderProduct) => {
                    return (
                        <OrderProductCard
                            key = {orderProduct.name}
                            orderProduct = {orderProduct}
                            cart = {cart}
                            setCart = {setCart}
                            token = {token} />
                    );
                })
                : <div className="cart-empy">
                    There are no items currently in your cart.
                </div>
                }

            </section>

            {cart.length > 0
            ? <section className="checkout">
                <div className="summary">
                    <h3>Items: {items}</h3>
                </div>

                <div className="total">
                    <h3>Total:</h3>
                    <h2 className="price-line"><span className="usd">USD</span><span className="gold-text">${orderTotal}</span> </h2>
                </div>

                <StripeCheckout
                    token={onToken(orderTotal * 100)}
                    stripeKey={STRIPE_KEY}
                    name="Grace Shopper"
                    amount={orderTotal * 100}
                    currency={CURRENCY}
                    shippingAddress
                    billingAddress>
                    <Button
                        className="checkout-button"
                        variant="contained"
                        color="primary">Checkout</Button>
                </StripeCheckout>

            </section>
            : ''
            }

            {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
        </main>
    );
};

export default Cart;