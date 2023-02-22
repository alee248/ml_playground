import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../css/Projects.css'
import { Button } from 'antd'
import axios from 'axios'

function Projects(props) {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${props.server}/api/projects`
        }).then(res => {
            setProjects(res.data)
        })
    }, [])

    const navigate = useNavigate()

    const handleMore = e => {
        if (props.login) {
            navigate(`/projects/${e.currentTarget.id}`)
        }
    }

    return (
        <>
            <div className="proj-content">
                {projects.map((project) => {
                    return (
                        <div className="project" key={project.Id}>
                            <div className="proj-title">{project.Title}</div>
                            <div className="proj-desc">{project.Description}</div>
                            <div className="proj-btn-area">
                                <div className="proj-cont"></div>
                                <div className="more-btn-area" hidden={props.login ? false : true}>
                                    <Button className="more-btn" id={project.Id} type='link' onClick={handleMore}>More</Button>
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

export default connect(mapStateToProps)(Projects)