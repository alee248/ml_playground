import React from 'react'
import ErrorImg from '../assets/404.jpg'
import '../css/Error.css'


function Error() {
    return (
        <div>
            <img className='error' src={ErrorImg} alt="" />
        </div>
    )
}

export default Error