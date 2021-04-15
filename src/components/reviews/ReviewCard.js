import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { renderStars } from '../../api/utils';

import './ReviewCard.css';
import ReviewEditor from './ReviewEditor';

const ReviewCard = ({ review, userData, token, setReviews }) => {

    // const [stars, setStars] = useState([false, false, false, false, false]);
    const [cardStars, setCardStars] = useState([false, false, false, false, false]);

    const [editorOpen, setEditorOpen] = useState(false);

    useEffect(() => {
        renderStars(review.stars, setCardStars);
    }, []);

    return (
        <div className="review-card">
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
                            setEditorOpen(review.id);
                        }}>Edit</Button>
                    <Button
                        variant="outlined"
                        color="primary">Delete</Button>
                </>
                : ''}
            </div>

            {editorOpen
            ? <ReviewEditor
                review = {review}
                token = {token}
                setEditorOpen = {setEditorOpen}
                setReviews = {setReviews}
                setCardStars = {setCardStars}/>
            : ''} 

        </div>
    );
};

export default ReviewCard;