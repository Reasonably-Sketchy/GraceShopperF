import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { 
    makeStyles,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput, 
    TextField} from '@material-ui/core';
import logo from '../../assets/grace-shopper-logo.png'

import './LoginRegister.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


const Login = ({ setUserAction }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    return (
        <>
            <div className="header-container">
                <h1>Login</h1>
            </div>

            <form className={classes.root}>
                {/* <FormControl fullWidth variant="outlined" color="primary" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput 
                        color="primary"
                        id="username"
                        value={username}
                        onChange={(event) => {setUsername(event.target.value)}}
                        required={true}
                        labelWidth={36}
                        />
                </FormControl>  */}

                <TextField 
                    className="login-input"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required={true} />

            </form>

            {/* <div className="user-action-container">
                <Button
                    className="cta-large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setUserAction('Login')
                    }}>Login</Button>
                <Button
                    className="cta-large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setUserAction('Register')
                    }}>Register</Button>
            </div> */}
        </>
    );
};

export default Login;