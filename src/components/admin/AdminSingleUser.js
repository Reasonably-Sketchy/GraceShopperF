import React, {useState, useEffect} from 'react';
import { callApi } from '../../api';

const SingleUser = ({thisUser, userData, token}) => {
    const [email, editEmail] = useState()
    const [isAdmin, setAdmin] = useState(false)

    const user = thisUser;

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const response = callApi({
            url: `/users/${user.id}`,
            method: 'PATCH',
            body: {
                email,
                isAdmin
            }, 
            token: token
        });

    }

        return (
            <>
                <div className="singleUser-container">
                    <h2>{user.username}</h2>
                    <h4>{user.email}</h4>
                    <img 
                        className="user-pfp"
                        src={user.imageURL}
                    ></img>
                    {user.isAdmin
                        ? <h4>{user.username} is an Admin</h4>
                        : <h4>{user.username} is not an Admin</h4>
                    }
                </div>

                <div className="editUser-container">
                    Edit User info:
                    <form
                        id="editUser"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            value={email}
                            placeholder={user.email}
                            onChange={(event)=>editEmail(event.target.value)}
                        >Edit email?</input>
                        <div id="isAdmin">Grant Admin?<input
                            type="checkbox"
                            value={isAdmin}
                            onChange={()=>setAdmin(true)}
                        ></input></div>
                    </form>                    
                </div>
            </>
        )
}

export default SingleUser; 

