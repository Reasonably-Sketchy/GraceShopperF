import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';

const SingleOrder = () => {
    const { orderId } = useParams();
    return (
        <div className="order-card">

            <div className="order-header">
                    <h4>Order <span className="gold-text">#{order.id}</span></h4>
                    <h4>Date Placed: <span className="gold-text">{order.datePlaced ? order.datePlaced : '--'}</span></h4>
            </div>

            <div className="order-data">
                <div className="data-pair">
                    <h4>Customer ID:</h4>
                    <h3>{order.userId}</h3>
                </div>

                <div className="data-pair">
                    <h4>Status: </h4>
                    <h3>{order.status}</h3>
                </div>

                <div className="data-pair">
                    <h4>Products: </h4>
                    <h3>4</h3>
                </div>

                <div className="data-pair">
                    <h4>Total: </h4>
                    <h3>$100.00</h3>
                </div>

                <div className="view-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setProductListOpen(!productListOpen)
                        }}>Order Products {productListOpen ? <KeyboardArrowDown/> : <KeyboardArrowRight />}</Button>
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;