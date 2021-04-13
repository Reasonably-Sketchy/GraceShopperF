import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AdminSingleUser from './AdminSingleUser'

const AdminUsers = ({allUsers}) => {
    const [thisUser, setThisUser] = useState({})

// ! need api route for GET /users
    return (
        <main id="users">
            <h1>All Users</h1>
            <section className="users-container">
                {allUsers.map((user)=>{
                    setThisUser(user);
                    return (
                        <React.Fragment key={user.id}>
                            <AdminSingleUser thisUser={thisUser}/>
                            <Link to={`/users/${user.id}`}>
                                <div className="user-container">
                                    <h3>{user.username}</h3>
                                    <img 
                                        className="user-pfp"
                                        src={user.imageURL}    
                                    ></img>
                                </div>
                            </Link>
                        </React.Fragment>
                    )
                })}
            </section>
        </main>
    )
}

export default AdminUsers; 