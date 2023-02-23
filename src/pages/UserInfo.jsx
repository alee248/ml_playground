import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/UserInfo.css'
import { useNavigate } from 'react-router-dom'


function UserInfo(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if (!props.login) {
            navigate('/')
        }
    })



    const greeting = (hour) => {
        if (hour < 12 && hour > 5) {
            return 'Good morning, '
        } else if (hour < 18) {
            return 'Good afternoon, '
        } else if (hour < 20) {
            return 'Good evening, '
        } else {
            return 'Good night, '
        }
    }

    return (
        <>
            <div className="ui-content">
                <div className="ui-greeting">
                    {greeting(new Date().getHours()) + props.username}!
                </div>

                <div className="ui-text">

                </div>
            </div>
        </>
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

export default connect(mapStateToProps)(UserInfo)
