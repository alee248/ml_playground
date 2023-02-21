import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'

function Login(props) {

    const navigate = useNavigate()

    if (props.login === 1) {
        // if already logged in
        navigate('/')
    }

    return (
        <>
            <div className="">{props.login}</div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        uid: state.uid,
        username: state.username,
        email: state.email
    }
}

export default connect(mapStateToProps)(Login)