import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/Login.css'
import { Popover, Button as ANTDButton } from 'antd'
import axios from 'axios'

const isEmail = email => {
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

function Login(props) {

    const navigate = useNavigate()
    if (props.login === 1) {
        // if already logged in
        navigate('/')
    }

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [disableLogin, setDisableLogin] = useState(false)

    const handleClickShowPassword = () => setShowPassword(show => !show)

    const handleEmailChange = e => {
        if (passwordAlert === 'Wrong email or password!') {
            setPasswordAlert('')
        }
        setEmailAlert('')
        if (passwordAlert === '') {
            setDisableLogin(false)
        }
        setEmail(e.target.value)
    }

    const handlePasswordChange = e => {
        setPasswordAlert('')
        if (emailAlert === '') {
            setDisableLogin(false)
        }
        setPassword(e.target.value)
    }

    const handleSubmit = () => {

        if (!disableLogin) {
            // check if email is correct
            if (!isEmail(email)) {
                setEmailAlert('Please enter a valid email address!')
                setDisableLogin(true)
            }

            // check if password is empty
            if (password === '') {
                setPasswordAlert('Please enter your password!')
                setDisableLogin(true)
            }

            if (isEmail(email) && password !== '') {
                axios({
                    method: 'post',
                    url: `${props.server}/api/user/login`,
                    data: {
                        email: email,
                        password: password
                    }
                }).then(res => {
                    const user = res.data
                    if (user.Id > -1) {
                        // successfully logged in
                        props.handleLogin(user)
                    } else {
                        setPasswordAlert('Wrong email or password!')
                        setDisableLogin(true)
                    }
                }).then(() => {
                    navigate('/')
                })
            }
        }

    }

    return (
        <div className='background'>
            <div className="logo">MLPlayground</div>
            <div className="login-content">
                <div className="login">Login</div>
                <div className="line"></div>
                <div className="input">
                    <TextField id='email' label='Email' variant='standard' value={email} onChange={handleEmailChange} />
                    <div className="email-alert" hidden={emailAlert === '' ? true : false}>{emailAlert}</div>
                    <FormControl variant="standard" sx={{ marginTop: '15px' }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className="password-alert" hidden={passwordAlert === '' ? true : false}>{passwordAlert}</div>
                </div>

                <div className="buttons">
                    <Button variant="contained" disableElevation onClick={handleSubmit} sx={{ height: '45px', margin: '10px' }}>
                        Login
                    </Button>

                    {/* <a className='signup' onClick={handleSignUp}>Sign up</a> */}

                    <Popover placement='top' content="Sign up not available for now" trigger="click">
                        <ANTDButton className='signup' type='link'>Sign up</ANTDButton>
                    </Popover>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: parseInt(state.login),
        uid: state.uid,
        username: state.username,
        email: state.email,
        server: state.server
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin(user) {
            const action = {
                type: 'userInfo',
                value: user
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)