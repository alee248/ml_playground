import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../css/Search.css'
import { Button } from 'antd'
import axios from 'axios'
import { FlashOnRounded } from '@mui/icons-material'

function Search(props) {

    const [projects, setProjects] = useState([])
    const [models, setModels] = useState([])
    const [searchParams] = useSearchParams()
    const input = searchParams.getAll('input')[0]

    const navigate = useNavigate()

    useEffect(() => {

        if (!props.login || input === undefined) {
            navigate('/')
        }
        axios({
            method: 'post',
            url: `${props.server}/api/search`,
            data: {
                title: input
            }
        }).then(res => {
            setProjects(res.data.projects)
            setModels(res.data.models)
        })
    }, [input])



    const handleMore = e => {
        if (props.login) {
            navigate(`/projects/${e.currentTarget.id}`)
        }
    }

    return (
        <>
            <div className="search-content">
                <div className="search-cate" hidden={projects.length === 0 ? true : false}>Projects</div>
                {projects.map((project) => {
                    return (
                        <div className="search" key={project.Id}>
                            <div className="search-title">{project.Title}</div>
                            <div className="search-desc">{project.Description}</div>
                            <div className="search-btn-area">
                                <div className="search-cont"></div>
                                <div className="more-btn-area" hidden={props.login ? false : true}>
                                    <Button className="more-btn" id={project.Id} type='link' onClick={handleMore}>More</Button>
                                </div>

                            </div>
                        </div>
                    )
                })}

                <div className="search-cate" hidden={models.length === 0 ? true : false}>Models</div>
                {models.map((model) => {
                    return (
                        <div className="search" key={model.Id}>
                            <div className="search-title">{model.Name}</div>
                            <div className="search-desc">{model.Details}</div>
                            <div className="search-btn-area">
                                <div className="search-cont"></div>
                                <div className="more-btn-area" hidden={props.login ? false : true}>
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

export default connect(mapStateToProps)(Search)