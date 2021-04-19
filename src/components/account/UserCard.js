import React from 'react';

const UserCard = ({ userData }) => {
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
        </div>
    );
};

export default UserCard;