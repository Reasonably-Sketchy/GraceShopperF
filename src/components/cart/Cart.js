import React, { useState } from "react";
import OrderProductCard from "../orders/OrderProductCard";

import "./Cart.css";

const Cart = ({ cart, setCart }) => {
    console.log('CART', cart)
    const [updatedCart, setUpdatedCart] = useState(cart);
    console.log('UPDATED CART: ', updatedCart)

    return (
        <main id="cart">
            <section className="cart-page-header">
                <h1>Shopping Cart</h1>
            </section>
            
            <section className="cart-page-display">

                {cart.length > 0
                ? cart.map((orderProduct) => {
                    return (
                        <OrderProductCard
                            key = {orderProduct.id}
                            orderProduct = {orderProduct}
                            updatedCart = {updatedCart}
                            setUpdatedCart = {setUpdatedCart} />
                    );
                })
                : <div className="cart-empy">
                    There are no items currently in your cart.
                </div>
                }

            </section>

        </main>
    )
//   return <div>Cart Page Sucess!</div>;
};

export default Cart;