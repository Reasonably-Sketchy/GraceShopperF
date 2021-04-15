import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

import './ReviewCard.css';

const ReviewCard = (review) => {
    console.log('REVIEW: ', review.review)
    const [stars, setStars] = useState([false, false, false, false, false]);

    useEffect(() => {
        const starsNum = review.review.stars;
        let newArray = [];
        if (starsNum === 1) {
            newArray = [true, false, false, false, false]
        } else if (starsNum === 2) {
            newArray = [true, true, false, false, false]
        } else if (starsNum === 3) {
            newArray = [true, true, true, false, false]
        } else if (starsNum === 4) {
            newArray = [true, true, true, true, false]
        } else if (starsNum === 5) {
            newArray = [true, true, true, true, true]
        } else {
            newArray = [false, false, false, false, false]
        };
        setStars(newArray);
    }, []);

    return (
        <div className="review-card">
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
    );
};

export default ReviewCard;