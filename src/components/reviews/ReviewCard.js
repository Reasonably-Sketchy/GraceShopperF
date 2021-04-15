import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { renderStars } from '../../api/utils';

import './ReviewCard.css';

const ReviewCard = (review, userData) => {
    console.log('REVIEW: ', review.review)
    const [stars, setStars] = useState([false, false, false, false, false]);

    useEffect(() => {
        renderStars(review.review.stars, setStars);
    }, []);

    return (
        <div className="review-card">
            <div className="review-content">
                <h2>"{review.review.title}"</h2>
                <div className="stars-container">
                    {stars.map((value) => {
                        console.log(value)
                        if (value) {
                            return <Star />
                        } else {
                            return <StarBorder />
                        };
                    })}
                </div>
                <p>{review.review.content}</p>
            </div>

            <div className="actions">
                {review.review.userId === userData.id
                ? <>
                    <Button
                        variant="contained"
                        color="primary">Edit</Button>
                    <Button
                        variant="contained"
                        color="primary">Delete</Button>
                </>
                : ''}
            </div>
 
        </div>
    );
};

export default ReviewCard;