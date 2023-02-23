import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/ProjectPage.css'
import axios from 'axios'

function ProjectPage(props) {

    const navigate = useNavigate()

    const { pid } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        axios({
            method: 'get',
            url: `${props.server}/api/projects/${pid}`
        }).then(res => {
            if (res.data === '') {
                navigate('/projects')
            }
            setProject(res.data)
            props.handleRoute(res.data.Title)
        })
    }, [])

    const handleMore = e => {
        navigate(`/models/${e.target.id}`)
    }

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
                <div className="proj-pg-head" hidden={project.Models && project.Models.length > 0 ? false : true}>Models</div>

                {project.Models ? project.Models.map(model => {
                    return (
                        <div className="proj-model" key={model.Id}>
                            <div className="proj-model-name">{model.Name}</div>
                            <div className="proj-model-more-btn" id={model.Id} onClick={handleMore}>More</div>
                        </div>

                    )
                }) : ''}


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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)