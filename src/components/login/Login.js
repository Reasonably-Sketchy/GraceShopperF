import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from '../../api/index';

import { 
    Button,
    TextField} from '@material-ui/core';

import './Welcome.css'

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [respMessage, setRespMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await callApi({
                url: '/users/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password,
                },
            });
        
            const token = data.token;
        
            if (token) {
                localStorage.setItem('token', token);
                setUsername('');
                setPassword('');
                setToken(token);
                // history.push something
            } else {
                setRespMessage(data.message);
            };

        } catch(error) {
            console.error(error);
        };
    };

    return (
        <main id="login-register">
            <div className="header-container">
                <h1>Login</h1>
            </div>

            {respMessage ? <div id="error-message">{ respMessage }</div> : ''}

            <form className="login-form" onSubmit={handleSubmit}>

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