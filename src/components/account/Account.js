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

const Account = ({ userData, setActiveLinkIs, token, setUserData }) => {
    if (!userData || !userData.id) {
        return <div className="loadingMessage">Loading...</div>
    };
    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ ordersOpen, setOrdersOpen ] = useState(false);
    const [ reviewsOpen, setReviewsOpen ] = useState(false);
    const [ userReviews, setUserReviews ] = useState([]);
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);

    useEffect(async () => {
        const myReviews = await getUserReviews(userData.id, token, numLoadingEvents, setNumLoadingEvents);
        if (myReviews) {
            setUserReviews(myReviews);
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
            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Account</h1>
                </section>
            </div>

            <section className="page-body">
                <div className="welcome-user">
                    <h3>Welcome,</h3>
                    <h1 className="gold-text">{userData.first}</h1>
                </div>

                <div className="user-cart">
                    <h3>Items in Your Cart:</h3>

                    <div className="carousel">
                        <div className="cart-display">
                            {cartProducts && cartProducts.length > 0
                            ? cartProducts.map((product) => {
                                return (
                                    <OrderProduct key = {product.name} product = {product} />
                                );
                            })
                            : <div>You have no products in your cart.</div>
                            }
                            </div>
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
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setDetailsOpen(!detailsOpen);
                        }}>User Info {detailsOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {detailsOpen
                    ? <UserCard 
                        userData = {userData}
                        setUserData = {setUserData} 
                        token = {token} />

                    : ''}

                    <Button
                        className="accordian-button"
                        variant="outlined"
                        color="primary"
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
                        variant="outlined"
                        color="primary"
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

            {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
        </main>
    );
};

export default Account;
