import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function Sidebar(props) {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(true)


    const handleClose = () => {
        setIsOpen(!isOpen)
    }

    const handleUser = () => {
        if (props.login === '0') {
            // if not logged in
            navigate('/login')
        } else {
            // TODO: navigate to userinfo
            
            // This is only temp code
            console.log('here')
            props.handleLogout()
        }
    }

    return (
        <>
            <div className={isOpen ? 'close-btn' : 'close-btn-closed'} onClick={handleClose}>{isOpen ? <LeftOutlined /> : <RightOutlined />}</div>
            <div className={isOpen ? 'layout' : 'layout-closed'}>
                <div className="logo-area">
                    <div className={`sidebar-logo${isOpen ? '' : '-out'}`} style={{width: '200px'}}>MLPlayground</div>
                    <div className={`sidebar-logo${isOpen ? '-out' : ''}`} style={{width: '80px'}}>MLP</div>
                </div>

                <div className={`login-box${isOpen ? '' : '-closed'}`} onClick={handleUser}>
                    {props.login === '0' ? 'login' : (
                        <div className="userinfo">{props.username}</div>
                    )}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        uid: state.uid,
        username: state.username,
        email: state.email,
        server: state.server
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout() {
            const action = {
                type: 'logout'
            }
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)