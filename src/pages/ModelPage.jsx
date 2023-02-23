import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/ModelPage.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios'
import ModelCard from '../components/ModelCard';
import TestModel from '../components/TestModel';


function ModelPage(props) {

    const navigate = useNavigate()

    const { mid } = useParams()
    const [model, setModel] = useState({})
    const [tab, setTab] = useState(0)

    useEffect(() => {
        axios({
            method: 'get',
            url: `${props.server}/api/models/${mid}`
        }).then(res => {
            if (res.data === '') {
                navigate('/projects')
            }
            setModel(res.data)
            props.handleRoute(res.data.Name)
        })
    }, [])

    const handleSwitchTab = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <>
            <div className="model-pg-content">
                <div className="model-pg-title">
                    {model.Name}
                </div>
                <div className="switch-tab">
                    <Tabs value={tab} onChange={handleSwitchTab}>
                        <Tab label="Model Card" sx={{ borderRadius: '10px 10px 0px 0px' }} />
                        <Tab label="Test Model" sx={{ borderRadius: '10px 10px 0px 0px' }} />
                    </Tabs>
                </div>
                <div className="model-card" hidden={tab === 0 ? false : true}>
                    <ModelCard Model={model} />
                </div>
                <div className="test-model" hidden={tab === 1 ? false : true}>
                    <TestModel Model={model} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleRoute(name) {
            const action = {
                type: 'setRouteName',
                value: name
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage)