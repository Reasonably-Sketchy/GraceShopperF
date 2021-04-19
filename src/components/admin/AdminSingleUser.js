import React, {useState, useEffect} from 'react';
import { callApi } from '../../api';
import {Link, useHistory, useParams} from 'react-router-dom';
import { fetchAllUsers } from '../../api/utils';
import UserCard from '../account/UserCard';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import EditUser from './EditUser';


const SingleUser = ({allUsers, userData, token, setAllUsers}) => {
    const history = useHistory();
    const [email, editEmail] = useState();
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState([]);
    const {userId} =  useParams();
    const [updateExpand, setUpdateExpand] = useState(false);

    if (!allUsers) {
        return <h1>Loading...</h1>
    }

    const thisUser = allUsers.find((user)=>{
        return Number(userId) === user.id
    })

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
        <main id="single-user">
            <div className="back-to">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        history.push('/admin');
                    }}
                ><KeyboardArrowLeft />Admin</Button>
            </div>
            <h1>User:</h1>
            <h2 className="gold-text">{thisUser.username}</h2>
            <div className="user-card">
                <div className="user-details">
                    <div className="data-pair">
                        <h4>First Name: </h4>
                        <h3>{thisUser.first}</h3>
                    </div>

                    <div className="data-pair">
                        <h4>Last Name: </h4>
                        <h3>{thisUser.last}</h3>
                    </div>

                    <div className="data-pair">
                        <h4>Username: </h4>
                        <h3>{thisUser.username}</h3>
                    </div>

                    <div className="data-pair">
                        <h4>Email: </h4>
                        <h3>{thisUser.email}</h3>
                    </div>
                </div>

                <div className="user-image">
                    <img src={thisUser.imageURL} alt={thisUser.first + ' ' + thisUser.last}/>
                </div>
            </div>

            <Button
                className="accordian-button"
                color="primary"
                variant="outlined"
                onClick={() => {
                    setUpdateExpand(!updateExpand);
                }}>Edit User Information {updateExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
                {updateExpand
                    ? <center><EditUser 
                        userData={userData}
                        token={token}
                        thisUser={thisUser}
                        setUser={setUser}
                        setAllUsers={setAllUsers}
                        path={"Admin"}
                        setUpdateExpand = {setUpdateExpand}
                        /></center>
                    : ''}
        </main>
    )
}

export default SingleUser; 