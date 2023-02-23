import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css'
import { LeftOutlined, RightOutlined, ProjectOutlined, UserOutlined, SlidersOutlined } from '@ant-design/icons';


function Sidebar(props) {

    const navigate = useNavigate()


    const handleClose = () => {
        props.handleSidebar()
    }

    const handleProjects = () => {
        if (props.login) {
            navigate('/projects')
        }
    }

    const handleModels = () => {
        if (props.login) {
            navigate('/models')
        }
    }

    const handleContributors = () => {
        // TODO
    }

    const handleUser = () => {
        if (!props.login) {
            // if not logged in
            navigate('/login')
        } else {
            // TODO: navigate to userinfo
        }
    }

    const handleLogout = () => {
        props.handleLogout()
        navigate('/')
    }

    return (
        <>
            <div className={props.sidebarOpen ? 'close-btn' : 'close-btn-closed'} onClick={handleClose}>{props.sidebarOpen ? <LeftOutlined /> : <RightOutlined />}</div>
            <div className={props.sidebarOpen ? 'layout' : 'layout-closed'}>
                <div className="logo-area">
                    <div className={`sidebar-logo${props.sidebarOpen ? '' : '-out'}`} style={{ width: '200px' }}>MLPlayground</div>
                </div>

                <div className={`login-box${props.sidebarOpen ? '' : '-closed'}`} onClick={handleUser}>
                    {!props.login ? 'login' : (
                        <div className={`userinfo${props.sidebarOpen ? '' : '-closed'}`}>{props.sidebarOpen ? props.username : props.username.charAt(0).toUpperCase()}</div>
                    )}
                </div>

                <div className='side-btns'>
                    <div className={`side-btn${props.login ? '' : '-disabled'}`} onClick={handleProjects}>
                        <div className={`tab-icon${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>
                            < ProjectOutlined />
                        </div>
                        <div className={`tab-text${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>Projects</div>
                    </div>
                    <div className={`side-btn${props.login ? '' : '-disabled'}`} onClick={handleModels}>
                        <div className={`tab-icon${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>
                            <SlidersOutlined />
                        </div>
                        <div className={`tab-text${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>Models</div>
                    </div>
                    <div className={`side-btn${props.login ? '' : '-disabled'}`} onClick={handleContributors}>
                        <div className={`tab-icon${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>
                            <UserOutlined />
                        </div>
                        <div className={`tab-text${props.login ? '' : '-disabled'}${props.sidebarOpen ? '' : '-closed'}`}>Contributors</div>
                    </div>
                </div>

                <div className={`logout${props.sidebarOpen ? '' : '-closed'}`} hidden={props.login ? false : true} onClick={handleLogout}>
                    Logout
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
        sidebarOpen: parseInt(state.sidebarOpen),
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
        },

        handleSidebar() {
            const action = {
                type: 'sidebar'
            }
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)