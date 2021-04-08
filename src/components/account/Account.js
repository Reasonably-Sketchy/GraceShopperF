import React, {useEffect, useState} from 'react';

import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

import OrderCard from './OrderCard';

import './Account.css';

const Account = ({ userData }) => {
    if (!userData) {
        return <h1>Loading...</h1>
    };

    const [ ordersOpen, setOrdersOpen ] = useState(false);
    return (
        <main id="account">

            <section className="page-header">
                <h2>Welcome</h2>
                <h1 className="gold-text">{userData.first}</h1>
            </section>


            <section className="page-body">
                <div className="user-cart">
                    <h2>Your Cart:</h2>
                    {/* Map the products in the cart here, or if empty, say no items currently in cart */}
                </div> 

                <div className="user-info">
                    <Button
                        className="accordian-button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setOrdersOpen(!ordersOpen);
                        }}>Order History {ordersOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {ordersOpen
                    ? userData.orders.length > 0
                        ? userData.orders.map((order) => {
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
