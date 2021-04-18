import React from 'react';
import {Link} from 'react-router-dom';

const UserList = ({user}) => {
    console.log('users line 5 userlist.js ', user)
    return (
        <Link to={`/users/${user.id}`}>
            <div className="indieUser-container">
                <h2>{user.username}</h2>
            </div>
        </Link>
    )
}

export default UserList;