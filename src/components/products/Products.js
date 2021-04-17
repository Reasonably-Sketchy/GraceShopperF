import React, {useEffect, useState} from 'react';

import ProductCard from './ProductCard';

import './Products.css';

const Products = ({ allProducts, userData, token, setAllProducts }) => {
    console.log(allProducts);

    return (
        
        <main id="products">
            <h1>Products</h1>

            <section className="products-container">

                {allProducts.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            product = {product}
                            userData={userData}
                            token={token} 
                            setAllProducts={setAllProducts}
                            allProducts={allProducts}
                        />
                    );
                })}

            </section>
        </main>
    );
};

export default Products;
