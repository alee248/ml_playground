import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/NaviBar.css'
import { RightOutlined } from '@ant-design/icons';

function FirstLetterCap (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function NaviBar(props) {
    
    const location = useLocation()
    const navigate = useNavigate()

    let pathname = location.pathname
    let paths = []

    if (pathname === '/') {
        paths.push('Projects')
    } else {
        paths = pathname.split('/')
        paths.shift()
    }

    const handleNavigate = e => {
        const index = e.target.id
        let url = '/'
        for (let i=0; i<=index; i++) {
            url += paths[i].toLowerCase()
        }
        navigate(url)
    }

    return (
        <>
            <div className="navibar-content">
                {paths.map((path, index) => {
                    return (
                        <div key={index} style={{display: 'flex'}}>
                            <div className="right-arrow" hidden={index === 0 ? true : false}><RightOutlined/></div>
                            <div className={`path${index === paths.length - 1 ? '-last' : ''}`} id={index} onClick={handleNavigate}>{FirstLetterCap(path)}</div>
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
