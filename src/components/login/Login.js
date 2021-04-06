import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Button,
    TextField} from '@material-ui/core';

import './Welcome.css'

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <main id="login-register">
            <div className="header-container">
                <h1>Login</h1>
            </div>

            <form className="login-form">

                <TextField 
                    className="login-input"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required={true} />

                <TextField 
                    className="login-input"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required={true} />

                <Button
                    className="responsive-button"
                    variant="contained"
                    color="primary"
                    type="submit">Login</Button>

                <Button
                    className="responsive-button"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        history.push('/welcome');
                    }}>Back</Button>

            </form>

        </main>
    );
    
};

export default Login;