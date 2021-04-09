import React, {useEffect, useState} from 'react';

import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

import OrderCard from '../orders/OrderCard';
import UserCard from './UserCard';

import './Account.css';
import ProductCard from '../products/ProductCard';

const Account = ({ userData }) => {
    if (!userData) {
        return <h1>Loading...</h1>
    };

    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ ordersOpen, setOrdersOpen ] = useState(false);
    
    let cartProducts = [];
    if (userData.cart) {
        cartProducts = userData.cart.products;
    };

    let completedOrders = [];
    if (userData.orders) {
        completedOrders = userData.orders.filter((order) => {return order.status !== 'created'});
    };

    return (
        <main id="account">

            <section className="page-header">
                <h2>Welcome</h2>
                <h1 className="gold-text">{userData.first}</h1>
            </section>


            <section className="page-body">
                <div className="user-cart">
                    <h2>Items in Your Cart:</h2>
                    <div className="cart-display">
                        {cartProducts.map((product) => {
                            return (
                                <ProductCard key = {product.id} product = {product} />
                            );
                        })}
                    </div>
                </div> 

                <div className="user-info">
                    <Button
                        className="accordian-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setDetailsOpen(!detailsOpen);
                        }}>User Info {detailsOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {detailsOpen
                    ? <UserCard userData = {userData} />

                    : ''}

                    <Button
                        className="accordian-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setOrdersOpen(!ordersOpen);
                        }}>Order History {ordersOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {ordersOpen
                    ? userData.orders.length > 0
                        ? completedOrders.map((order) => {
                            return <OrderCard key={order.id} order={order} />
                        })
                        : <div className="no-orders-message">No orders to display.</div>

                    : ''}

                </div>




            </section>


            {/* <div className="user-orders">

            </div> */}

        </main>
    );
};

export default Account;
