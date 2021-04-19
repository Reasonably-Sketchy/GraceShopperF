import React, {useState, useEffect} from 'react';
import { callApi } from '../../api';
import {Link, useParams} from 'react-router-dom';
import { fetchAllUsers } from '../../api/utils';

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