import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

import ProductCard from './ProductCard';

import './Products.css';

const SingleProduct = ({ allProducts }) => {
    const { productId } = useParams();

    if (!allProducts) {
        return <h1>Loading...</h1>
    };

    const thisProduct = allProducts.find((product) => {return product.id == productId})

    if (!thisProduct) {
        return <h1>This product does not exist.</h1>
    };
    
    return (
        <main id="products">
            <h1>{thisProduct.name}</h1>
            <img className="product-picture" src={thisProduct.imageURL} />
            <h2>{thisProduct.price} USD</h2>
            <p>{thisProduct.description}</p>
            <Button
                variant="outlined"
                color="primary">Add to Cart</Button>
        </main>
    );
};

export default SingleProduct;