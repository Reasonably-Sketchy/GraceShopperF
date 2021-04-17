import React from 'react';
import {Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

import './ProductCard.css';

const ProductCard = ({ product, cartButtonText, cartButtonAction  }) => {

    return (
        <Link to={`/products/${product.id}`}>
            <div className="product-card">
                <div className="product-picture-container">
                    <img className="product-picture" src={product.imageURL} />
                </div>
                <div className="product-data">
                    <h1>{product.name}</h1>
                    <h2>{product.price} USD</h2>
                    {cartButtonText && cartButtonAction ? 
                        <Button
                            id="productCartButton"
                            className="responsive-button"
                            variant="contained"
                            color="primary"
                            onClick={() => cartButtonAction()}
                        >{cartButtonText}</Button> : <></>
                    }
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
