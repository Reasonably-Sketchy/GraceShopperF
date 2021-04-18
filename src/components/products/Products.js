import React, {useEffect, useState} from 'react';

import ProductCard from './ProductCard';

import './Products.css';

const Products = ({ allProducts }) => {
    console.log(allProducts);
    return (
        
        <main id="products">
            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Products</h1>
                </section>
            </div>

            <section className="products-container">

                {allProducts.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            product = {product} 
                        />
                    );
                })}

            </section>
        </main>
    );
};

export default Products;
