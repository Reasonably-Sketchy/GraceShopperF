import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { editReview, fetchReviews, renderStars } from '../../api/utils';


import './ReviewEditor.css';
// review id
const ReviewEditor = ({ review, setEditorOpen, token, setReviews, setCardStars }) => {
    const [title, setTitle] = useState(review.title);
    const [stars, setStars] = useState(review.stars);
    const [content, setContent] = useState(review.content);
    const [respMessage, setRespMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !content) {
            setRespMessage('Please fill out all required fields.');
            return;
        };

        try {
            const body = {
                title: title,
                stars: stars,
                content: content,
            };
            const editedReview = await editReview(review.id, body, token);
            const updateReviews = await fetchReviews(review.productId);
            setReviews(updateReviews);
            renderStars(stars, setCardStars);
            setEditorOpen(false);
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className="editor-background">
        <div className="review-editor">

            <div className="close-button-container">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setEditorOpen(false);
                    }}>Close</Button>
            </div>

            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>

                <div className="fieldset">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}}/>
                </div>

                <div className="fieldset">
                    <h3>Stars</h3>
                    <div className="stars-container">
                        <div 
                            className="star"
                            onClick={() => {
                                if (stars !== 1) {
                                    setStars(1);
                                } else {
                                    setStars(0);
                                };
                            }}>{stars >= 1 ? <Star /> : <StarBorder />}</div>
                        <div 
                            className="star"
                            onClick={() => {
                                if (stars !== 2) {
                                    setStars(2);
                                } else {
                                    setStars(0);
                                };
                            }}>{stars >= 2 ? <Star /> : <StarBorder />}</div>
                        <div 
                            className="star"
                            onClick={() => {
                                if (stars !== 3) {
                                    setStars(3);
                                } else {
                                    setStars(0);
                                };
                            }}>{stars >= 3 ? <Star /> : <StarBorder />}</div>
                        <div 
                            className="star"
                            onClick={() => {
                                if (stars !== 4) {
                                    setStars(4);
                                } else {
                                    setStars(0);
                                };
                            }}>{stars >= 4 ? <Star /> : <StarBorder />}</div>
                        <div 
                            className="star"
                            onClick={() => {
                                if (stars !== 5) {
                                    setStars(5);
                                } else {
                                    setStars(0);
                                };
                            }}>{stars >= 5 ? <Star /> : <StarBorder />}</div>
                    </div>
                </div>

                <div className="fieldset">
                    <label htmlFor="content">Review</label>
                    <textarea 
                        rows="3"
                        id="content" 
                        value={content}
                        onChange={(event) => {setContent(event.target.value)}}/>
                </div>

                {respMessage ? <span className="resp-message">{respMessage}</span> : ''}

                <div className="submit-container">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">Update Review</Button>
                </div>

            </form>

        </div>
        </div>
    );
};

export default ReviewEditor;