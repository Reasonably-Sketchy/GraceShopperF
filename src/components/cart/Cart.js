import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import OrderProductCard from "../orders/OrderProductCard";
import axios from 'axios';

import "./Cart.css";
import { Button } from "@material-ui/core";

const STRIPE_KEY = 'pk_test_51IemByGFMkmVlUo2ZadMmHIIQKtbGWn2OdYjCM2aOLy0JVMa5WajgLBi5qAeg2dj90cmmfpb9Rcp8Ycb2FxXmVGp00le6ddDto';
const CURRENCY = 'USD';
const PAYMENT_URL = 'http://localhost:3000/api/pay';

const onToken = (amount) => async (token) => {
    console.log("Token is: ", token);
    try {
        const response = await axios.post(PAYMENT_URL, {
            source: token.id,
            currency: CURRENCY,
            amount,
        });
        console.log('Payment Success!', response);
    } catch (error) {
        console.error(error);
    };
};

const Cart = ({ cart, setCart, token }) => {
    console.log('MY CART: ', cart)

    const generateOrderTotal = () => {
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

    const orderTotal = generateOrderTotal();

    return (
        <main id="cart">
            <section className="cart-page-header">
                <h1>Shopping Cart</h1>
            </section>
            
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

            <section className="checkout">
                <h1>Total:</h1>

                <StripeCheckout
                    token={onToken(orderTotal * 100)}
                    stripeKey={STRIPE_KEY}
                    name="Grace Shopper"
                    amount={orderTotal * 100}
                    currency={CURRENCY}
                    shippingAddress
                    billingAddress
                >
                    <Button
                        variant="contained"
                        color="primary">Checkout</Button>
                </StripeCheckout>

            </section>

        </main>
    )
//   return <div>Cart Page Sucess!</div>;
};

export default Cart;