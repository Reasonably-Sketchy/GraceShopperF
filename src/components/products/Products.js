import React, {useEffect, useState} from 'react';

import ProductCard from './ProductCard';

const Products = () => {
    return (
        <main id="products">
            <h1>Products Page</h1>

            <ProductCard />
        </main>
    );
};

export default Products;
