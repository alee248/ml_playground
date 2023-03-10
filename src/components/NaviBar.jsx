import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/NaviBar.css'
import { RightOutlined } from '@ant-design/icons';
import axios from 'axios';

function FirstLetterCap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function NaviBar(props) {

    const location = useLocation()
    const navigate = useNavigate()

    let pathname = location.pathname

    let paths = []

    if (pathname === '/') {
        paths.push('projects')
        props.handleRoute('')
    } else {
        paths = pathname.split('/')
        paths.shift()
        if (paths.length <= 1) {
            props.handleRoute('')
        }
    }

    const handleNavigate = e => {
        const index = e.target.id
        if (index < paths.length - 1) {
            let url = '/'
            for (let i = 0; i <= index; i++) {
                url += paths[i].toLowerCase()
            }
            navigate(url)
        }

    }


    return (
        <>
            <div className="navibar-content">
                {paths.map((path, index) => {
                    return (
                        <div key={index} style={{ display: 'flex' }}>
                            <div className="right-arrow" hidden={index === 0 ? true : false} key={index}><RightOutlined /></div>
                            <div className={`path${index === paths.length - 1 ? '-last' : ''}`} id={index} key={(index+1)*100} onClick={handleNavigate}>{isNaN(Number(path)) ? FirstLetterCap(path) : props.routeName}</div>
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default NaviBar
