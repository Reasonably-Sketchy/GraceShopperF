import React, {useState} from 'react';
import {callApi} from '../../api';
import {Button, TextField} from '@material-ui/core';
import AdminModal from './AdminModal';
import { updateAdminData, updateUserData } from '../../api/utils';

import './Admin.css'

const EditUser = ({userData, token, thisUser, setUserData, setAllUsers, path, setUpdateExpand}) =>{

    const [firstName, setFirstName] = useState(thisUser.first);
    const [lastName, setLastName] = useState(thisUser.last);
    const [email, setEmail] = useState(thisUser.email);
    const [username, setUsername] = useState(thisUser.username);
    const [password, setPassword] = useState(thisUser.password);
    const [admin, setAdmin] = useState(thisUser.isAdmin ? true : false);
    const [imageURL, setImageURL] = useState(thisUser.imageURL ? thisUser.imageURL : '');
    const [modalOpen, setModalOpen] = useState(false);

    if (!userData) {
        return <div className="loadingMessage">Loading...</div>
    };

    const modalCloseFunction = () => {
        setUpdateExpand(false);
    };

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

            if (data) {
                setModalOpen(true);
                if (path === "Admin") {
                    updateAdminData(token, setAllUsers, null, null);
                } else if (path === "Account") {
                    updateUserData(token, setUserData)
                };
            };
        } catch(error) {
            console.error(error)
        }
    };

    const handleDelete = async (event) => {
        // event.preventDefault();

        const confirmed = confirm(`Are you sure you want to delete ${thisUser.username}?`);
        if (confirmed === true) {
            try {
                const response = await callApi({
                    url: `/users/${thisUser.id}`,
                    method: 'DELETE',
                    token
                });
                if (response) {
                    setModalOpen(true);
                    if (path === "Admin") {
                        updateAdminData(token, setAllUsers, null, null);
                    } else if (path === "Account") {
                        updateUserData(token, setUserData)
                    };
                };
            } catch (error) {
                throw error;
            }
        }
    }

    return (
        <>
            {modalOpen 
            ? <AdminModal 
                action = {"User Information Updated"}
                data = {username}
                modalCloseFunction = {modalCloseFunction}/>
            : ''
            }   
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
                    required={true} />

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

                {path === "Admin"
                ? <TextField 
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required={true} />
                : ''}
                
                {path === "Admin"
                ? <div className="isAdminCheck">Grant Admin?<input
                    type="checkbox"
                    value={admin}
                    checked={admin ? true : false}
                    id="isAdmin"
                    onChange={()=>setAdmin(!admin)}
                ></input></div>
                : ''}

                <Button
                    className="responsive-button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    >Save Changes</Button>

                <Button
                    className="responsive-button"
                    id="murder-user"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={()=>{
                        handleDelete();
                    }}
                    >Delete User</Button>
                


            </form>
            </div>
        </>
    )

}
export default EditUser;