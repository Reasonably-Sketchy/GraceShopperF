import { Button } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import React, { useState } from 'react';
import EditUser from '../admin/EditUser';

const UserCard = ({ userData, token, setUserData }) => {
    const [updateExpand, setUpdateExpand] = useState(false);
    return (
        <div className="user-card">
            <div className="user-details">
                <div className="data-pair">
                    <h4>First Name: </h4>
                    <h3>{userData.first}</h3>
                </div>

                <div className="data-pair">
                    <h4>Last Name: </h4>
                    <h3>{userData.last}</h3>
                </div>

                <div className="data-pair">
                    <h4>Username: </h4>
                    <h3>{userData.username}</h3>
                </div>

                <div className="data-pair">
                    <h4>Email: </h4>
                    <h3>{userData.email}</h3>
                </div>
            </div>

            <div className="user-image">
                <img src={userData.imageURL} alt={userData.first + ' ' + userData.last}/>
            </div>

            <div className="edit-container">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        setUpdateExpand(!updateExpand);
                    }}>Edit my info {updateExpand ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
            </div>

            {updateExpand
            ? <EditUser
                userData = {userData}
                token = {token}
                thisUser = {userData}
                path = {"Account"}
                setUserData = {setUserData}
                setUpdateExpand = {setUpdateExpand} />
            : ''}
        </div>
    );
};

export default UserCard;