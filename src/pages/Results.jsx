import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../css/Result.css'

function Results(props) {

    const [searchParams] = useSearchParams()
    const rid = searchParams.getAll('rid')[0]

    const navigate = useNavigate()

    const [result, setResult] = useState({})

    useEffect(() => {
        if (!props.login) {
            navigate('/')
        }

        axios({
            method: 'get',
            url: `${props.server}/api/results/${rid}`
        }).then(res => {
            console.log(res.data)
            if (res.data) {
                setResult(res.data)
            } else {
                navigate('/')
            }
            
        })
    }, [])

    return (
        <div className="res-content">
            123
        </div>
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

export default connect(mapStateToProps)(Results)
