import React from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/NaviBar.css'
import { RightOutlined } from '@ant-design/icons';

function FirstLetterCap (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function NaviBar(props) {
    
    const location = useLocation()
    let pathname = location.pathname
    let paths = []

    if (pathname === '/') {
        paths.push('Projects')
    } else {
        paths = pathname.split('/')
        paths.shift()
    }

    return (
        <>
            <div className="navibar-content">
                {paths.map((path, index) => {
                    return (
                        <div key={index} style={{display: 'flex'}}>
                            <div className="right-arrow" hidden={index === 0 ? true : false}><RightOutlined/></div>
                            <a className={`path${index === paths.length - 1 ? '-last' : ''}`}>{FirstLetterCap(path)}</a>
                        </div>
                        
                    )
                })}
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

export default connect(mapStateToProps)(NaviBar)
