import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {callApi} from '../../api';
import {Button, TextField, Checkbox} from '@material-ui/core';

import './Admin.css'
import { updateAdminData } from '../../api/utils';

const EditUser = ({token, thisUser, setUser, setAllUsers}) =>{

    const [firstName, setFirstName] = useState(thisUser.first);
    const [lastName, setLastName] = useState(thisUser.last);
    const [email, setEmail] = useState(thisUser.email);
    const [username, setUsername] = useState(thisUser.username);
    const [password, setPassword] = useState(thisUser.password);
    const [admin, setAdmin] = useState(thisUser.isAdmin);
    const [imageURL, setImageURL] = useState(thisUser.imageURL || '');
    const history = useHistory();

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const data = await callApi({
                url: `/users/${thisUser.id}`,
                method: 'PATCH',
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
            setUser([data]);
            alert('User Edited!');
            updateAdminData(token, setAllUsers);
            history.push(`/admin`);

        } catch(error) {
            console.error(error)
        }

    };

    return (
        <>
            <h3>Edit User</h3>

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
                    required={false} />

                <TextField 
                    id="username"
                    placeholder="New Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required={true} />

                <TextField 
                    id="imageURL"
                    placeholder="Profile Image URL"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                    required={false} />

                <TextField 
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required={false} />
                
                <div id="isAdminCheck">Grant Admin?<input
                        type="checkbox"
                        value={admin}
                        id="isAdmin"
                        onClick={()=>setAdmin(true)}
                    ></input></div>

                <Button
                    className="responsive-button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    >Edit User</Button>
                


            </form>
            </div>
        </>
    )

}
export default EditUser;