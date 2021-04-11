import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

import ProductCard from './ProductCard';

import './Products.css';

const SingleProduct = ({ allProducts, cart, setCart, token }) => {
    const { productId } = useParams();

    if (!allProducts) {
        return <h1>Loading...</h1>
    };

    const thisProduct = allProducts.find((product) => {return product.id == productId})

    if (!thisProduct) {
        return <h1>This product does not exist.</h1>
    };
    
    const cartAlreadyContainsProduct = cart.find((product) => product.id === thisProduct.id);

    return (
        <main id="products">
            <ProductCard 
                key={thisProduct.id}
                product = {thisProduct} 
                cartButtonText={cartAlreadyContainsProduct ? "Remove from Cart" : "Add to Cart"}
                cartButtonAction={() => { 
                    if(cartAlreadyContainsProduct) {
                        let firstInstanceOfProduct = cart.indexOf(thisProduct);
                        if(firstInstanceOfProduct != -1){
                            cart.splice(firstInstanceOfProduct, 1);
                            setCart(cart);
                        }
                        if(token) {
                            // TODO PUSH TO USER CART IN DATABASE
                        }
                    } else {
                        cart.push(thisProduct);
                        setCart(cart);
                        if(token) {
                            // TODO PUSH TO USER CART IN DATABASE
                        }
                    }
                    
                }}
            />
            {/* <h1>{thisProduct.name}</h1>
            <img className="product-picture" src={thisProduct.imageURL} />
            <h2>{thisProduct.price} USD</h2>
            <p>{thisProduct.description}</p>
            <Button
                variant="outlined"
                color="primary">Add to Cart</Button> */}
        </main>
    );
};

export default SingleProduct;