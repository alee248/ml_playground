import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/ProjectPage.css'

function ProjectPage(props) {

    return (
        <>
            <div className="proj-pg-content">project page</div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: parseInt(state.login),
        uid: state.uid,
        username: state.username,
        email: state.email
    }
}

export default connect(mapStateToProps)(ProjectPage)