import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { addReview, fetchReviews } from '../../api/utils';


import './ReviewEditor.css';

const ReviewCreator = ({ productId, setCreatorOpen, token, setReviews }) => {
    const [title, setTitle] = useState('');
    const [stars, setStars] = useState(0);
    const [content, setContent] = useState('');
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
            const newReview = await addReview(productId, body, token);
            console.log('REVIEW CREATED: ', newReview);
            setTitle('');
            setStars(0);
            setContent('');
            const updateReviews = await fetchReviews(productId);
            setReviews(updateReviews);

            setCreatorOpen(false);
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
                        setCreatorOpen(false);
                    }}>Close</Button>
            </div>

            <h1>Leave a review</h1>
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
                        type="submit">Add Review</Button>
                </div>

            </form>

        </div>
        </div>
    );
};

export default ReviewCreator;