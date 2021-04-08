import React, {useEffect, useState} from 'react';

import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

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

                <div className="user-info">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setOrdersOpen(!ordersOpen);
                        }}>Previous Orders {ordersOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {ordersOpen
                    ? userData.orders.length > 0
                        ? <div className="no-orders-message">No orders to display.</div>
                        // userData.orders.map((order) => {
                        //     return <div key={order.id}>Order Component for {order.id}</div>
                        // })
                        : <div className="no-orders-message">No orders to display.</div>

                    : ''}
                </div>



                <div className="user-cart">
                    <h2>My Cart:</h2>
                </div>

            </section>


            {/* <div className="user-orders">

            </div> */}

        </main>
    );
};

export default Account;
