import React, { useState } from 'react';
import {callApi} from '../../api'
import {Button, TextField} from '@material-ui/core';
import AdminModal from '../admin/AdminModal';
import { updateAdminData } from '../../api/utils';

const AddProduct = ({token, setAllProducts, setProductsExpand}) => {
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);

    const modalCloseFunction = () => {
        setProduct('');
        setDescription('');
        setImageURL('');
        setCategory('');
        setPrice(0);
        setProductsExpand(false);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const data = await callApi({
                url: '/products',
                method: 'POST',
                body: {
                    name: product,
                    description: description,
                    imageURL: imageURL,
                    price: price,
                    category: category
                },
                token: token
                
            });
            // setAllProducts(data)
            if (data) {
                setModalOpen(true);
                await updateAdminData(token, null, null, setAllProducts, numLoadingEvents, setNumLoadingEvents);
            };

        } catch(error) {
            console.error(error)
        }

    };

    return (
        <>
            {modalOpen 
            ? <AdminModal 
                action = {"Product Created"}
                data = {product}
                modalCloseFunction = {modalCloseFunction}/>
            : ''
            }

            <div className="addProduct-Container">
                <h3>Add New Product</h3>
                <form className="register-form" onSubmit={handleSubmit}>

                <TextField 
                    id="product"
                    placeholder="Product Name"
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                    required={true} />

                <TextField 
                    id="description"
                    placeholder="Product Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required={true} />

                <TextField 
                    id="imageURL"
                    placeholder="Product Image URL (optional)"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                    required={false} />

                <TextField 
                    id="imageURL"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required={false} />

                <TextField 
                    id="price"
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={(event) => setPrice(event.target.value)}
                    required={true} />


                <Button
                    className="responsive-button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    >Add Product</Button>

            </form>
            </div>
            {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
        </>
    );
};

export default AddProduct; 

