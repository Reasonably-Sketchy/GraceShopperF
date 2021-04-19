import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { KeyboardArrowRight, Star, StarBorder } from '@material-ui/icons';
import { renderStars } from '../../api/utils';

import './ReviewCard.css';
import { useHistory } from 'react-router';

const UserReview = ({ review, userData, setActiveLinkIs }) => {
    const history = useHistory();
    const [cardStars, setCardStars] = useState([false, false, false, false, false]);

    useEffect(() => {
        renderStars(review.stars, setCardStars);
    }, []);

    return (
        <div className="review-card account-review-card">
            <div className="review-content">
                <h2>"{review.title}"</h2>
                <div className="stars-container">
                    {cardStars.map((value) => {
                        if (value) {
                            return <Star />
                        } else {
                            return <StarBorder />
                        };
                    })}
                </div>
                <p>{review.content}</p>
            </div>

            <div className="actions">
                {review.userId === userData.id
                ? <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            history.push(`/products/${review.productId}`);
                            setActiveLinkIs('Products');
                        }}>View Product<KeyboardArrowRight /></Button>
                </>
                : ''}
            </div>
        </div>
    );
};

export default UserReview;