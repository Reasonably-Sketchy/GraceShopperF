import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { renderStars } from '../../api/utils';

import './ReviewCard.css';
import ReviewEditor from './ReviewEditor';
import DeleteModal from './DeleteModal';

const ReviewCard = ({ review, userData, token, setReviews }) => {
    const [cardStars, setCardStars] = useState([false, false, false, false, false]);
    const [editorOpen, setEditorOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
                            setEditorOpen(true);
                        }}>Edit</Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setDeleteModalOpen(true)
                        }}>Delete</Button>
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

            {deleteModalOpen
            ? <DeleteModal 
                review = {review}
                token = {token}
                setDeleteModalOpen = {setDeleteModalOpen}
                setReviews = {setReviews}
                cardStars = {cardStars}
            />
            : ''}

        </div>
    );
};

export default ReviewCard;