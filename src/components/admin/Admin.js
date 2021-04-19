import React, {useState, useEffect} from 'react';

import AddUser from './AddUser';
import AdminUsers from './AdminUsers';
import {fetchAllUsers} from '../../api/utils';
import {Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import AddProduct from '../products/AddProduct';
import './Admin.css';
import SingleUser from './AdminSingleUser';
import UserList from './UserList'; 
import {Route} from 'react-router-dom';

const Admin = ({token, setAllProducts, allUsers, setAllUsers}) => {
    const history = useHistory();
    const [usersExpand, setUsersExpand] = useState(false);
    const [allUsersExpand, setAllUsersExpand] = useState(false);
    const [productsExpand, setProductsExpand] = useState(false);
    const [thisUser, setThisUser] = useState({})

    if (!allUsers) {
        return <h1>Loading...</h1>
    };

    const transitionCLick = () => {
        <SingleUser user={thisUser}></SingleUser>;
    }

    return (
        <main id="admin">
            <center><h1>Admin</h1></center>
            <div className="user-info">
            User Options:
                <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setUsersExpand(!usersExpand);
                    }}>Add User {usersExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                {usersExpand
                ? <center>
                    <AddUser 
                        token = {token}
                        setAllUsers = {setAllUsers}/>
                </center>
                : ''}
                
                <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setAllUsersExpand(!allUsersExpand);
                    }}>View All Users {allUsersExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                


                {allUsersExpand
                ? <div className="user-list">
                    {allUsers.map((user)=>{
                        return (
                            <Button 
                                className="user-button"
                                color="primary"
                                key={user.id}
                                onClick={()=>{
                                    console.log('userid line 91', user.id)
                                    localStorage.setItem('thisUser', user.id)

                                    history.push(`/users/${user.id}`)
                                }}
                            >{user.username}</Button>
                        )})}
                </div>
                : ''}

            </div>

            {/* change class name later keeping for css for now */}
            <div className="user-info">
            Order Options:
                <Button
                    className="responsive-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        history.push('/orders')
                    }}>View All Orders</Button>                
            </div>
            
            {/* change class name later keeping for css for now */}
            <div className="user-info">
            Product Options: 
            <Button
                    className="accordian-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setProductsExpand(!productsExpand);
                    }}>Add New Product {productsExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                {productsExpand
                ? <center><AddProduct 
                    token={token}
                    setAllProducts={setAllProducts}
                    /></center>
                : ''}
            </div>


        </main>
    );
};

export default Admin;