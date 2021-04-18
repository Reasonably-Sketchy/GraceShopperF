
export const addStateCartToDB = async (databaseCart, cart, setCart, addProductToOrder, token, updateUserData, setUserData) => {
    let cartCopy = [];
    if (databaseCart && databaseCart.products && databaseCart.products.length > 0) {
        const dbCartOrderProducts = [databaseCart.products];
        console.log('MY DB CART PRODUCTS: ', dbCartOrderProducts[0]);
        // Nothing in cart pre-login
        if (cart && cart.length === 0) {
            dbCartOrderProducts[0].forEach((orderProduct) => {cartCopy.push(orderProduct)});
            setCart(cartCopy);
            return;
        }
    };

    // Items in cart pre-login:
    if (cart && cart.length > 0) {
        cartCopy = [...cart];
        const newCart = [];
        if (databaseCart && databaseCart.products && databaseCart.products.length > 0) {
            // Map over db cart and delete duplicates from cart
            const dbCartOrderProducts = [databaseCart.products];
            for (let i = 0; i < dbCartOrderProducts[0].length; i++) {
                const dbProduct = dbCartOrderProducts[0][i];
                const indexToRemove = cartCopy.findIndex((product) => {return product.productId === dbProduct.productId});
                if (indexToRemove >= 0) {
                    cartCopy.splice(indexToRemove, 1);
                };
            };
            dbCartOrderProducts[0].forEach(product => newCart.push(product));
        };
        // Create new order products out of cart products
        const newOrderProducts = await Promise.all(cartCopy.map(async (product) => {
            const body = {
                productId: product.productId,
                price: product.price,
                quantity: product.quantity,
            };
            const newOrderProduct = await addProductToOrder(databaseCart.id, body, token);
            console.log('ADDED FROM CART: ', newOrderProduct);
            return newOrderProduct;
        }));
        newOrderProducts.forEach(product => newCart.push(product));
        setCart(newCart);
        await updateUserData(token, setUserData);
    };
   
};