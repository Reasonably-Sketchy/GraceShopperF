import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import CategoryDropdown from './CategoryDropdown';
import ProductSearch from './ProductSearch';

import './Products.css';

const Products = ({ allProducts, userData, token, setAllProducts }) => {

    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [currentCategory, setCurrentCategory] = useState('');
    const [query, setQuery] = useState('');

    const queryMatch = (product, string) => {
        if (product.name.toLowerCase().includes(string.toLowerCase())
        || product.description.toLowerCase().includes(string.toLowerCase())
        || product.category.toLowerCase().includes(string.toLowerCase())) {
            return true;
        } else {
            return false;
        };
    };

    // Retrieve product categories
    useEffect(() => {
        if (allProducts.length === 0) {
            return <h1>Loading...</h1>
        };
        setProductsToDisplay(allProducts);

        const categories = allProducts.map((product) => {return product.category})
        const uniqueCategories = []
        for (let i = 0; i < categories.length; i++) {
            const current = categories[i];
            if (uniqueCategories.includes(current) === false) {
                uniqueCategories.push(current);
            };
        };
        
        if (uniqueCategories.length > 0) {
            setProductCategories(uniqueCategories);
        };
    }, [allProducts]);

    // Handle queries & filters
    useEffect(() => {
        if (allProducts.length) {
            let toQuery = [];
            if (filteredProducts.length > 0 && currentCategory) {
                console.log('Category: ', currentCategory);
                toQuery = [...filteredProducts];
            } else {
                toQuery = [...allProducts];
            };

            if (toQuery.length > 0 && query.length > 0) {
                const queriedProducts = toQuery.filter((product) => queryMatch(product, query));
                setProductsToDisplay(queriedProducts);
            };
        };   
    }, [query, currentCategory])


    return (
        <main id="products">
            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Products</h1>
                </section>
            </div>

            <div className="filter">
                <ProductSearch 
                    query = {query}
                    setQuery = {setQuery} />
                <CategoryDropdown 
                    categories = {productCategories}
                    allProducts = {allProducts}
                    setProductsToDisplay = {setProductsToDisplay}
                    setFilteredProducts = {setFilteredProducts}
                    setCurrentCategory = {setCurrentCategory} 
                    currentCategory = {currentCategory}/>
            </div>

            <section className="products-container">

                {productsToDisplay.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            product = {product} 
                            userData = {userData}
                            token = {token} 
                            setAllProducts = {setAllProducts}
                            allProducts = {allProducts}
                        />
                    );
                })}

            </section>
        </main>
    );
};

export default Products;
