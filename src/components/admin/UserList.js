import React from 'react';
import {Link} from 'react-router-dom';

const UserList = ({user, userData, token, allUsers, setAllUsers}) => {
    console.log('users line 5 userlist.js ', user)
    return (
        <center><Link to={`/users/${user.id}`}>
            <div className="indieUser-container">
                <h2>{user.username}</h2>
            </div>
        </Link></center>
    )
}

export default UserList;