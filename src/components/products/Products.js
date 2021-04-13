import React, {useEffect, useState} from 'react';

import ProductCard from './ProductCard';

import './Products.css';

const Products = ({ allProducts }) => {
    console.log(allProducts);
    return (
        
        <main id="products">
            <h1>Products Page</h1>

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
