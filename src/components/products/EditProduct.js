import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {callApi} from '../../api'
import {Button, TextField} from '@material-ui/core'

const EditProduct = ({token, userData, productId}) => {
    const [product, editName] = useState('');
    const [description, editDescription] = useState('');
    const [imageURL, editImageURL] = useState('');
    const [category, editCategory] = useState('');
    const [price, editPrice] = useState();
    const [allProducts, setAllProducts] = useState([])
    const history = useHistory();

    const handleEdit = async (event) =>{
        event.preventDefault();

        try {
            const data = await callApi({
                url: `/products/${productId}`,
                method: 'PATCH',
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
                let result = await callApi({
                    url: '/products',
                    method: 'GET',
                    token: token
                })
                if(Array.isArray(result)){
                    setAllProducts(result)
                }
            }
            history.push('/products')

        } catch(error) {
            console.error(error)
        }

    };



    return <>
        <h3>Edit Product</h3>

        <div className="editProduct-Container">
            <form className="register-form" onSubmit={handleEdit}>
                <TextField 
                    id="product"
                    placeholder="Name"
                    value={product}
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
                    id="imageURL"
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

            </form>
        </div>
</>
};

export default EditProduct; 