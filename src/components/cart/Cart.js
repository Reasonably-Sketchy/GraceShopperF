import React from "react";
import "./Cart.css";
import ProductCard from '../products/ProductCard'

const Cart = ({ cart, setCart }) => {
    console.log('CART', cart)

    return (
        <main id="cart">
            <h1>Cart Page</h1>
            {cart.map((product) =>  (
                <ProductCard 
                    key={product.id}
                    product = {product}
                />
            ))}
        </main>
    )
//   return <div>Cart Page Sucess!</div>;
};

export default Cart;
