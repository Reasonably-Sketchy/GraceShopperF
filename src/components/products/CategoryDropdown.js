import React from 'react';

const CategoryDropdown = ({ categories, allProducts, setFilteredProducts, currentCategory, setCurrentCategory, setProductsToDisplay }) => {
    if (!categories) {
        return <div className="loadingMessage">Loading...</div>
    };

    const handleChange = (event) => {
        const categoryToDisplay = event.target.value.toLowerCase();
        if (categoryToDisplay === 'categories') {
            setFilteredProducts(allProducts);
            setProductsToDisplay(allProducts);
            setCurrentCategory('');
        } else {
            const products = [...allProducts].filter((each) => {return each.category.toLowerCase() === categoryToDisplay});
            setFilteredProducts(products);
            setProductsToDisplay(products);    
            setCurrentCategory(categoryToDisplay);
        };
    };

    return (
        <fieldset 
            className="category-dropdown"
            onChange={handleChange}>
            <label htmlFor="categories"></label>
            <select id="categories">
                <option>Categories</option>
                {categories.map((category, index) => {
                    return (
                        <option key = {index}>{category}</option>
                    );
                })};
            </select>
        </fieldset>
    );
};

export default CategoryDropdown;