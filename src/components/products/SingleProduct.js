import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';

import ProductCard from './ProductCard';

// import './Products.css';
import './SingleProduct.css';

const SingleProduct = ({ allProducts }) => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    if (!allProducts) {
        return <h1>Loading...</h1>
    };

    const thisProduct = allProducts.find((product) => {return product.id == productId})

    if (!thisProduct) {
        return <h1>This product does not exist.</h1>
    };
    
    const handleQuantityChange = async (event) => {
        setQuantity(Number(event.target.value))
    };

    return (
        <main id="single-product">
            <section className="single-product-image-container">
                <img className="product-picture" src={thisProduct.imageURL} />
            </section>

            <section className="single-product-description">
                <h1>{thisProduct.name}</h1>
                <h3 className="description">{thisProduct.description}</h3>
                <h3><span className="gold-text">{thisProduct.price}</span> USD</h3>
                
                <div className="action-container">

                    <fieldset className="quantity-container">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            name="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}></input>
                    </fieldset>

                    <Button
                        variant="outlined"
                        color="primary">Add to Cart</Button>
                </div>

            </section>

        </main>
    );
};

export default SingleProduct;