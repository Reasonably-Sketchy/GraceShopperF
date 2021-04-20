import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {callApi} from '../../api'
import {Button, TextField} from '@material-ui/core'
import { editProduct, updateAdminData } from '../../api/utils';

const EditProduct = ({
    token, 
    thisProduct, 
    setEditExpand, 
    setAllProducts, 
    setModalOpen}) => {
        
    const [name, editName] = useState(thisProduct.name);
    const [description, editDescription] = useState(thisProduct.description);
    const [imageURL, editImageURL] = useState(thisProduct.imageURL);
    const [category, editCategory] = useState(thisProduct.category);
    const [price, editPrice] = useState(thisProduct.price);
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);
    const history = useHistory();

    const handleEdit = async (event) =>{
        event.preventDefault();

        try {
            const body = {
                name: name,
                description: description,
                imageURL: imageURL,
                price: price,
                category: category
            };
            const updatedProduct = await editProduct(thisProduct.id, body, token);
            if (updatedProduct) {
                updateAdminData(token, null, null, setAllProducts, numLoadingEvents, setNumLoadingEvents);
                setEditExpand(false);
                setModalOpen(true);
            }
        } catch(error) {
            console.error(error)
        }

    };

    return <>
        <h3>Edit Product</h3>

        <div className="editProduct-Container">
            <div className="product-editor-header">
                <h1>Edit Product:</h1>
                <h2 className="gold-text">{thisProduct.name}</h2>
            </div>
            <form className="register-form" onSubmit={handleEdit}>
                <TextField 
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => editName(event.target.value)}
                    required={true} />

                <TextField 
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => editDescription(event.target.value)}
                    required={false} />

                <TextField 
                    id="imageURL"
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(event) => editImageURL(event.target.value)}
                    required={false} />

                <TextField 
                    className="imageURL"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => editCategory(event.target.value)}
                    required={false} />

                <TextField 
                    id="price"
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={(event) => editPrice(event.target.value)}
                    required={false} />


                <Button
                    className="responsive-button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    >edit Product</Button>

                <Button
                    className="responsive-button"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setEditExpand(false);
                    }}
                    >Cancel</Button>

            </form>
        </div>
        {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
</>
};

export default EditProduct; 
