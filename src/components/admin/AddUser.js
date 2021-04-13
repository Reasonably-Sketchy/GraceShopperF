import React, {useState, useEffect} from 'react';

const AddUser = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    
    // ! need api routes and adapters
    const handleSubmit = async (event) =>{
        event.preventDefault();

        const response = callApi()
        // TODO build out when routes and adapters exist
    };


    return (
        <>
            <h1>Add User</h1>

            <div className="addUser-Container">
                <form
                    id="addUser"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={firstName}
                        required
                        placeholder="First Name"
                        onChange={(event)=>setFirstName(event.target.value)}
                    ></input>
                    <input
                        type="text"
                        value={lastName}
                        required
                        placeholder="Last Name"
                        onChange={(event)=>setLastName(event.target.value)}
                    ></input>
                    <input
                        type="text"
                        value={email}
                        required
                        placeholder="Email"
                        onChange={(event)=>setEmail(event.target.value)}
                    ></input>
                    <input
                        type="text"
                        value={password}
                        required
                        min="7"
                        placeholder="password"
                        onChange={(event)=>setPassword(event.target.value)}
                    ></input>
                    <div id="isAdmin">Grant Admin?<input
                        type="checkbox"
                        value={admin}
                        onChange={()=>setAdmin(true)}
                    ></input></div>
                </form>
            </div>
        </>
    )
}

export default AddUser;