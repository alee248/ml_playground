import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function Home(props) {

    return (
        <>
            <div className="">home - {props.username}</div>
            <Outlet />
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

export default connect(mapStateToProps)(Home)