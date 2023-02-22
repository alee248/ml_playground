import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Projects.css'

function Projects(props) {

    return (
        <>
            <div className="proj-content">projects page</div>
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

export default connect(mapStateToProps)(Projects)