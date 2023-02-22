import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/ProjectPage.css'
import axios from 'axios'

function ProjectPage(props) {

    const { pid } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        axios({
            method: 'get',
            url: `${props.server}/api/projects/${pid}`
        }).then(res => {
            setProject(res.data)
        })
    }, [])

    return (
        <>
            <div className="proj-pg-content">
                <div className="proj-pg-title">
                    {project.Title}
                </div>
                <div className="proj-pg-head">Description</div>
                <div className="proj-pg-text">
                    {project.Description}
                </div>
                <div className="proj-pg-head">Goal</div>
                <div className="proj-pg-text">
                    {project.Goal}
                </div>
                <div className="proj-pg-head">Models</div>
                <div className="proj-pg-text">

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

export default connect(mapStateToProps)(ProjectPage)