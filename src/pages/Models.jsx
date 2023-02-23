import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../css/Models.css'
import { Button } from 'antd'

function Models(props) {

    const navigate = useNavigate()

    const [models, setModels] = useState([])

    useEffect(() => {

        if (!props.login) {
            navigate('/')
        }

        axios({
            method: 'get',
            url: `${props.server}/api/models`
        }).then(res => {
            setModels(res.data)
        })
    }, [])

    const handleMore = e => {
        if (props.login) {
            navigate(`/models/${e.currentTarget.id}`)
        }
    }

    return (
        <>
            <div className="model-content">
                {models.map((model) => {
                    return (
                        <div className="model" key={model.Id}>
                            <div className="model-title">{model.Name}</div>
                            {/* <div className="model-detail-head">Model Details</div> */}
                            <div className="model-detail">{model.Details}</div>
                            <div className="model-btn-area">
                                <div className="model-cont"></div>
                                <div className="more-btn-area">
                                    <Button className="more-btn" id={model.Id} type='link' onClick={handleMore}>More</Button>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}
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

export default connect(mapStateToProps)(Models)