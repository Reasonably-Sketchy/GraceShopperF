import React from 'react';

import OrderCard from '../orders/OrderCard';

import './Orders.css';

const Orders = ({ orders, setOrders }) => {

    

    return (
        <>
        {orders.map((order)=>(<OrderCard order={order}/>))}
        </>
    );
};

export default Orders;