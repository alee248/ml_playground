import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function Projects(props) {

    return (
        <>
            <div className="">projects</div>
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