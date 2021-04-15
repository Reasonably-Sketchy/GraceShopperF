import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

import OrderCard from '../orders/OrderCard';
import UserCard from './UserCard';
import OrderProduct from './OrderProduct';
import { getUserReviews } from '../../api/utils';
import UserReview from '../reviews/UserReview';

import './Account.css';

const Account = ({ userData, setActiveLinkIs, token }) => {
    if (!userData || !userData.id) {
        return <h1>Loading...</h1>
    };
    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ ordersOpen, setOrdersOpen ] = useState(false);
    const [ reviewsOpen, setReviewsOpen ] = useState(false);
    const [ userReviews, setUserReviews ] = useState([]);

    useEffect(async () => {
        const myReviews = await getUserReviews(userData.id, token);
        if (myReviews) {
            setUserReviews(myReviews);
            console.log('MY REVIEWS: ', myReviews)
        };
    }, []);


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

                        {cartProducts && cartProducts.length > 0
                        ? cartProducts.map((product) => {
                            return (
                                <OrderProduct key = {product.name} product = {product} />
                            );
                        })
                        : <div>You have no products in your cart.</div>
                        }

                        {cartProducts && cartProducts.length > 0
                        ? <Link to='/cart'>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setActiveLinkIs('Cart');
                                }}
                                >Go to Cart<KeyboardArrowRight /></Button>
                        </Link>
                        : ''}

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

                    <Button
                        className="accordian-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setReviewsOpen(!reviewsOpen);
                        }}>User Reviews {reviewsOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {reviewsOpen
                    ? userReviews && userReviews.length > 0
                        ? userReviews.map((review) => {
                            return (
                                <UserReview
                                    key = {review.id} 
                                    review = {review}
                                    userData = {userData}
                                    setActiveLinkIs = {setActiveLinkIs}
                                 />
                            );
                        })
                        : <div className="no-orders-message">No reviews to display.</div>

                    : ''}

                </div>




            </section>


            {/* <div className="user-orders">

            </div> */}

        </main>
    );
};

export default Account;
