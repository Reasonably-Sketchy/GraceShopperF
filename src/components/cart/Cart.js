import React from 'react';
import './Cart.css';

const Cart = ({cart, setCart})=>{

    return(
        <Orders orders={cart} setOrders={setCart}/>
    );
}

export default Cart;