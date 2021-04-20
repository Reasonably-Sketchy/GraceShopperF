import React, {useState, useEffect} from 'react';

import AddUser from './AddUser';
import { updateAdminData } from '../../api/utils';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import AddProduct from '../products/AddProduct';
import './Admin.css';

const Admin = ({token, setAllProducts, allUsers, setAllUsers, setAllOrders}) => {
    const history = useHistory();
    const [usersExpand, setUsersExpand] = useState(false);
    const [allUsersExpand, setAllUsersExpand] = useState(false);
    const [productsExpand, setProductsExpand] = useState(false);
    const [numLoadingEvents, setNumLoadingEvents] = useState(0);

    if (!allUsers) {
        return <div className="loadingMessage">Loading...</div>
    };

    useEffect(async () => {
        await updateAdminData(token, setAllUsers, setAllOrders, setAllProducts);
    }, [])

    return (
        <main id="admin">
            <div className="page-header-image">
                <section className="page-header">
                    <h1 className="header-text">Admin</h1>
                </section>
            </div>
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
                        setAllUsers = {setAllUsers}
                        allUsers = {allUsers}
                        setUsersExpand = {setUsersExpand}/>
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
                    }}>Orders Log <KeyboardArrowRight /></Button>                
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
                    setProductsExpand = {setProductsExpand}
                    /></center>
                : ''}
            </div>

            {numLoadingEvents > 0 ? <div className="loadingMessage">Loading...</div>:<></>}
        </main>
    );
};

export default Admin;