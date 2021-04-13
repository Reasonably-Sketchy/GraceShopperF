import React, {useState, useEffect} from 'react';

import AddUser from './AddUser';
import AdminUsers from './AdminUsers';
import AdminSingleUser from './AdminSingleUser';

const Admin = () => {
    // ! need api route for GET /users
    // We may want to move this state/useEffect to the Admin page for security of user data
    const [allUsers, setAllUsers] = useState([]);
    
    // useEffect(async ()=>{
    //     try {
    //         const users = await fetchAllUsers();
    //         if (users) {
    //             setAllUsers(users);
    //         };
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }, [])

    return (
        <main id="admin">
            {/* <AddUser /> */}
            <AdminUsers allUsers = {allUsers}/>
            {/* <AdminSingleUser /> */}
        </main>
    );
};

export default Admin;