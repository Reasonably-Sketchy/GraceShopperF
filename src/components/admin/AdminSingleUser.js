import React, {useState, useEffect} from 'react';
import { callApi } from '../../api';
import {Link, useParams} from 'react-router-dom';
import { fetchAllUsers } from '../../api/utils';
<<<<<<< HEAD

const SingleUser = ({allUsers, userData, token}) => {
    const [email, editEmail] = useState()
    const [isAdmin, setAdmin] = useState(false)
    const [user, setUser] = useState([])
    const {userId} =  useParams()


    if (!allUsers) {
        return <h1>Loading...</h1>
    }

    const thisUser = allUsers.find((user)=>{
        return Number(userId) === user.id
    })

    useEffect(async()=>{
        try {

        } catch (error) {
            console.error(error)
        }
    })


    setUser(thisUser);
    console.log('this User line 21', thisUser)


=======
import UserCard from '../account/UserCard';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import EditUser from './EditUser';


const SingleUser = ({allUsers, userData, token, setAllUsers}) => {
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

>>>>>>> dev

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


    return (<>
<<<<<<< HEAD
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

        {/* <div className="editUser-container">
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
        </div> */}
    </>)
}



export default SingleUser; 
=======
        <h1>User Info</h1>
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
            variant="contained"
            color="secondary"
            onClick={() => {
                setUpdateExpand(!updateExpand);
            }}>Edit {updateExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
            {updateExpand
                ? <center><EditUser 
                    token={token}
                    thisUser={thisUser}
                    setUser={setUser}
                    setAllUsers={setAllUsers}
                    /></center>
                : ''}
    </>)
}



export default SingleUser; 

{/* <>
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
</> */}
>>>>>>> dev
