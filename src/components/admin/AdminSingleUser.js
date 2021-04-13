import React, {useState, useEffect} from 'react';
import { callApi } from '../../api';

const SingleUser = ({thisUser, userData}) => {
    const [email, editEmail] = useState()
    const [admin, setAdmin] = useState(false)

    // ! need api routes and adapters
    const handleSubmit = async (event) =>{
        event.preventDefault();

        const response = callApi()
        // TODO build out when routes and adapters exist
    }

    // or check admin in index.js might be better most probably
    if (userData.isAdmin) {
        return (
            <>
                <div className="singleUser-container">
                    <h2>{thisUser.username}</h2>
                    <h4>{thisUser.email}</h4>
                    <img 
                        className="user-pfp"
                        src={thisUser.imageURL}
                    ></img>
                    {thisUser.isAdmin
                        ? <h4>{thisUser.username} is an Admin</h4>
                        : <h4>{thisUser.username} is not an Admin</h4>
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
                            placeholder={thisUser.email}
                            onChange={(event)=>editEmail(event.target.value)}
                        >Edit email?</input>
                        <div id="isAdmin">Grant Admin?<input
                            type="checkbox"
                            value={admin}
                            onChange={()=>setAdmin(true)}
                        ></input></div>
                    </form>                    
                </div>
            </>
        )
    } else return (
        <h2>Must be Admin to view users</h2>
    )
}

export default SingleUser;