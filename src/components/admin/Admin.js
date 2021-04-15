import React, {useState, useEffect} from 'react';

import AddUser from './AddUser';
import AdminUsers from './AdminUsers';
import AdminSingleUser from './AdminSingleUser';
import {fetchAllUsers} from '../../api/utils';
import {Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';


const Admin = ({token}) => {
    const history = useHistory();

    // We may want to move this state/useEffect to the Admin page for security of user data
    const [allUsers, setAllUsers] = useState([]);

    const [detailsOpen, setDetailsOpen] = useState(false);


    
    useEffect(async ()=>{
        try {
            const users = await fetchAllUsers();
            console.log('users line 16 in admin.js', users)
            if (users) {
                setAllUsers(users);
            };
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <main id="admin">
            <div className="user-info">
                    <Button
                        className="accordian-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setDetailsOpen(!detailsOpen);
                        }}>Add User {detailsOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>

                    {detailsOpen
                    ? <center><AddUser/></center>
                    : ''}

                    <Button
                        className="responsive-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            history.push('/users')
                        }}>All Users</Button>
                </div>

            {/* <AdminUsers allUsers={allUsers} token={token}/> */}
            {/* <AdminSingleUser /> */}
        </main>
    );
};

export default Admin;