import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css'
import { LeftOutlined, RightOutlined, ProjectOutlined, UserOutlined, SlidersOutlined } from '@ant-design/icons';


function Sidebar(props) {

    const navigate = useNavigate()
    const [winWidth, setWinWidth] = useState(document.querySelector('body').offsetWidth)

    useEffect(() => {

        const handleResize = e => {
            if (e.target.innerWidth <= 560) {
                setWinWidth(560)
            } else if (e.target.innerWidth <= 750) {
                setWinWidth(750)
            } else if (e.target.innerWidth < 1000) {
                setWinWidth(999)
            } else {
                setWinWidth(1000)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [winWidth])


    const handleClose = () => {
        props.handleSidebar()
    }

    const handleProjects = () => {
        if (props.login) {
            if (winWidth <= 750) {
                props.handleSidebar()
            }
            navigate('/projects')
        }
    }

    const handleModels = () => {
        if (props.login) {
            if (winWidth <= 750) {
                props.handleSidebar()
            }
            navigate('/models')
        }
    }

    const handleContributors = () => {
        // TODO
    }

    const handleUser = () => {
        if (!props.login) {
            // if not logged in
            if (winWidth <= 750) {
                props.handleSidebar()
            }
            navigate('/login')
        } else {
            // navigate to userinfo
            if (winWidth <= 750) {
                props.handleSidebar()
            }
            navigate('/userinfo')
        }
    }

    const handleLogout = () => {
        props.handleLogout()
        if (winWidth <= 750) {
            props.handleSidebar()
        }
        navigate('/')
    }

    return (
        <>
            <div className={props.sidebarOpen ? 'close-btn' : 'close-btn-closed'} onClick={handleClose}>{props.sidebarOpen ? <LeftOutlined /> : <RightOutlined />}</div>
            <div className={props.sidebarOpen ? 'layout' : 'layout-closed'}>
                <div className="logo-area">
                    <div className={`sidebar-logo${props.sidebarOpen ? '' : '-out'}`} style={{ width: '200px' }}>MLPlayground</div>
                </div>

                <div className={`login-box${props.usertype === 'Regular' ? '' : '-prime'}${props.sidebarOpen ? '' : '-closed'}`} onClick={handleUser}>
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
        usertype: state.usertype,
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