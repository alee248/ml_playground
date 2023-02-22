import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/Models.css'

function Models(props) {

    return (
        <>
            <div className="model-content">models page</div>
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

export default connect(mapStateToProps)(Models)