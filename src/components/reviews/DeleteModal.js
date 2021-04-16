import { Button } from '@material-ui/core';
import React from 'react';
import { Star, StarBorder } from '@material-ui/icons';

import './DeleteModal.css';
import { deleteReview, fetchReviews } from '../../api/utils';

const DeleteModal = ({ setDeleteModalOpen, review, token, setReviews, cardStars }) => {

    const handleDelete = async (event) => {
        event.preventDefault();
        const deletedReview = await deleteReview(review.id, token);
        console.log('DELETED REVIEW: ', deletedReview);
        const updateReviews = await fetchReviews(review.productId);
        setReviews(updateReviews);
        setDeleteModalOpen(false);
    };

    return(
        <div className="editor-background">
        <div className='delete-modal'>
            <div className="delete-modal-content">
                <h2>Delete this review?</h2>
                
                <div className="review">
                    <h2 className="gold-text">"{review.title}"</h2>
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
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setDeleteModalOpen(false);
                        }}>Cancel</Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}>Delete Review</Button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DeleteModal;