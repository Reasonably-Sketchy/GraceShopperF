import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import './OrderCard.css';

const OrderCard = ({ order }) => {

    console.log('ORDER', order);

    const [productListOpen, setProductListOpen] = useState(false);

    // Generates total price for product based on quantity
    if (order && order.products) {
        const productTotals = order.products.map((product) => {
            const quantity = product.quantity;
            const price = product.price;
            const total = (Number(quantity) * Number(price));
            product.total = total;
            return total;
        });
        console.log(productTotals)

        order.total = productTotals.reduce((total, num) => {return total + num});
        console.log(order.total);
    };



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
                    <h3>{order.products.length}</h3>
                </div>

                <div className="data-pair">
                    <h4>Total: </h4>
                    <h3>${order.total}</h3>
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
            
            {productListOpen !== ''
            ? <div className="order-products">
                {/* MAP OVER PRODUCTS FOR ORDERID = productListOpen */}
            </div>
            : ''}


        </div>
    );
};

export default OrderCard;