import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

<<<<<<< HEAD
import { callApi } from '../../api';
=======
>>>>>>> dev

import './ProductCard.css';
import { callApi } from '../../api';

const ProductCard = ({ 
    product, 
    cartButtonText, 
    cartButtonAction, 
    userData,
    token,
    setAllProducts,
    allProducts
}) => {

    const history = useHistory();
    const handleDelete = async ()=>{

        const confirmed = confirm(`Are you sure you want to delete ${product.name}?`);
        if( confirmed === true ) {
            const thisProduct = Number(product.id)
            console.log('this product 25 ', thisProduct)
            const response = await callApi({
                url: `/products/${thisProduct}`,
                method: 'DELETE',
                token: token
            });

<<<<<<< HEAD
const ProductCard = ({ 
    product, 
    cartButtonText, 
    cartButtonAction,
    userData,
    token,
    setAllProducts,
    allProducts
  }) => {

    const history = useHistory();
    const handleDelete = async ()=>{
        const confirmed = confirm(`Are you sure you want to delete ${product.name}?`);
        if( confirmed === true ) {
            const thisProduct = Number(product.id)
            console.log('this product 25 ', thisProduct)
            const response = await callApi({
                url: `/products/${thisProduct}`,
                method: 'DELETE',
                token: token
            });
            const filtered = allProducts.filter((product)=> product.id !== thisProduct)
            setAllProducts(filtered);
        } else {
            return
        };  
    };

    return (
        <>
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

                        {userData.isAdmin
                        ? <Button
                            id="deleteProductButton"
                            variant="contained"
=======
            const filtered = allProducts.filter((product)=> product.id !== thisProduct)
            setAllProducts(filtered);


        } else {
            return
        }
        
    }

    return (<>
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
                    {userData.isAdmin
                        ? <Button
                            id="deleteProductButton"
                            variant="contained"
>>>>>>> dev
                            color="secondary"
                            onClick={(event) =>{
                                event.preventDefault();
                                handleDelete();  
                            }} 
                            >DELETE</Button>
<<<<<<< HEAD
                        : ''}
                    </div>
                </div>
            </Link>
=======
                        : ''
                    }
                </div>
            </div>
        </Link>
>>>>>>> dev
        </>
    );
};

export default ProductCard;
