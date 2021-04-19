import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import OrderCard from '../orders/OrderCard';
import OrderProductCard from '../orders/OrderProductCard';

const AdminOrders = ({allOrders, token, userData}) =>{
    const history = useHistory();
    const [sectionOpen, setSectionOpen] = useState('');

    if(!allOrders) {
        return <center><h1>Orders Loading....</h1></center>
    };

    const carts = allOrders.filter((order) => order.status === "created" && order.products.length > 0);
    const completedOrders = allOrders.filter((order) => order.status === "completed" && order.products.length > 0);
    const cancelledOrders = allOrders.filter((order) => order.status === "cancelled")

    return (
        <main id="orders-page">
            
            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Orders Log</h1>
                </section>
            </div>

            <div className="back-to">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        history.push('/admin');
                    }}
                ><KeyboardArrowLeft />Admin</Button>
            </div>

            <section className="orders-section">
                <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        sectionOpen !== 'carts'
                        ? setSectionOpen('carts')
                        : setSectionOpen('');
                    }}>Open Carts {sectionOpen === 'carts' ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                
                {sectionOpen === 'carts'
                ?<div className="orders-display">
                    {carts && carts.length > 0
                    ? carts.map((order) => {
                        return (
                            <OrderCard 
                                key = {order.id}
                                order = {order} />
                        );
                    })
                    : <div className="none-to-display">
                        <h3>No open carts to display.</h3>
                    </div>
                    }
                </div>
                : '' }
            </section>

            <section className="orders-section">
                <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        sectionOpen !== 'completed'
                        ? setSectionOpen('completed')
                        : setSectionOpen('');
                    }}>Completed Orders {sectionOpen === 'completed' ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                {sectionOpen === 'completed'
                ? <div className="orders-display">
                    {completedOrders && completedOrders.length > 0
                    ? completedOrders.map((order) => {
                        return (
                            <OrderCard 
                                key = {order.id}
                                order = {order} />
                        );
                    })
                    : <div className="none-to-display">
                        <h3>No completed orders to display.</h3>
                    </div>
                    }
                </div>
                : '' }
            </section>

            <section className="orders-section">
                <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        sectionOpen !== 'cancelled'
                        ? setSectionOpen('cancelled')
                        : setSectionOpen('');
                    }}>Cancelled Orders {sectionOpen === 'cancelled' ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                
                {sectionOpen === 'cancelled'
                ? <div className="orders-display">
                    {cancelledOrders && cancelledOrders.length > 0
                    ? cancelledOrders.map((order) => {
                        return (
                            <OrderCard 
                                key = {order.id}
                                order = {order} />
                        );
                    })
                    : <div className="none-to-display">
                        <h3>No cancelled orders to display.</h3>
                    </div>
                    }
                </div>
                : '' }
            </section>
        </main>
    );
};

export default AdminOrders;
