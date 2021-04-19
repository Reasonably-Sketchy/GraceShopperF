import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {callApi} from '../../api';
import {Button, TextField, Checkbox} from '@material-ui/core';
import { updateAdminData } from '../../api/utils';

const AddUser = ({token, setAllUsers, allUsers}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const data = await callApi({
                url: '/users/register',
                method: 'POST',
                body: {
                    first: firstName,
                    last: lastName,
                    email: email,
                    imageURL: imageURL,
                    username: username,
                    password: password,
                    isAdmin: admin                    
                },
                token
            });
            
            if (data) {
                console.log('USER CREATED: ', data);
                updateAdminData(token, setAllUsers);
            };
            
        } catch(error) {
            console.error(error)
        };
    };


    return (
        <>
            <h3>Add User</h3>
            <div className="addUser-Container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="double-input">
                        <TextField 
                            id="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required={true} />

                        <TextField 
                            id="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required={true} />
                    </div>

                    <TextField 
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required={true} />

                    <TextField 
                        id="username"
                        placeholder="Desired Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required={true} />

                    <TextField 
                        id="imageURL"
                        placeholder="Profile Image URL (optional)"
                        value={imageURL}
                        onChange={(event) => setImageURL(event.target.value)}
                        required={false} />

                    <TextField 
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required={true} />

                    <Button
                        className="responsive-button"
                        variant="contained"
                        color="primary"
                        type="submit"
                        >Create User</Button>
                </form>
            </div>
        </>
    );
};

export default AddUser;