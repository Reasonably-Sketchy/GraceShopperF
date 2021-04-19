import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {callApi} from '../../api'
import {Button, TextField} from '@material-ui/core'

const AddProduct = ({token, setAllProducts}) => {
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState();
    const history = useHistory();

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
            setAllProducts(data)
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

    return (
        <>
            <div className="addProduct-Container">
                <h3>Add Product</h3>
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
        </>
    );
};

export default AddProduct; 

