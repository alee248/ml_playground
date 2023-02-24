import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/UserInfo.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Space, Table, Tag } from 'antd';


function UserInfo(props) {

    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [historyData, setHistoryData] = useState([])
    const [comments, setComments] = useState([])
    const [historyLoading, setHistoryLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);

    const getDate = d => {
        let res = ''
        let datetime = new Date(d)
        let year = datetime.getFullYear()
        let month = datetime.getMonth()
        let day = datetime.getDay()
        let time = datetime.toString().substring(16, 21)

        return month + '/' + day + '/' + year.toString().substring(2) + ' ' + time
    }

    const historyColumns = [
        {
            title: 'Model',
            dataIndex: 'modelName',
            key: 'modelName'
        },
        {
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
            width: 80
        },
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 50
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value) => value === null ? '-' : value,
            align: 'center',
            width: 70
        },
        {
            title: 'Prob',
            dataIndex: 'probability',
            key: 'probability',
            render: (value) => value === null ? '-' : value,
            align: 'center',
            width: 70
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 76
        },
    ]

    const commentsColumns = [
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment'
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center'
        },
    ]

    const handleResult = e => {
        console.log(e.target.id)
        // TODO: navigate to result page
    }



    useEffect(() => {
        if (!props.login) {
            navigate('/')
        }
        setHistoryLoading(true)
        setCommentLoading(true)
        axios({
            method: 'get',
            url: `${props.server}/api/user/getPendingJobs/${props.uid}`
        }).then(res => {
            setHistory(res.data)

            // set historyData
            const data = []
            if (res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    data.push({
                        key: res.data[i].Id,
                        modelName: (<a href={`/models/${res.data[i].Model.Id}`}>{res.data[i].Model.Name}</a>),
                        version: res.data[i].Model.Version,
                        fileName: res.data[i].FileName,
                        status: res.data[i].Status === 'Done' ? (<div className='status-done'>Done</div>) : (res.data[i].Status === 'Failed' ? <div className='status-failed'>Failed</div> : <div className='status'>{res.data[i].Status}</div>),
                        value: res.data[i].Value,
                        probability: res.data[i].Prob,
                        date: getDate(res.data[i].Datetime),
                        action: res.data[i].Status === 'Done' || res.data[i].Status === 'Failed' ? (<div className='res-pg-btn' id={res.data[i].Id} onClick={handleResult}>Result</div>) : null
                    })
                }
            }

            setHistoryData(data)
            setHistoryLoading(false)

        })

        axios({
            method: 'get',
            url: `${props.server}/api/user/getComments/${props.uid}`
        }).then(res => {
            // set comments
            const data = []
            if (res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].Visibility) {
                        data.push({
                            key: res.data[i].Id,
                            comment: res.data[i].Comment,
                            model: (<a href={`/models/${res.data[i].Model.Id}`}>{res.data[i].Model.Name}</a>),
                            date: getDate(res.data[i].Datetime),
                            action: (<div className='com-btn-area'>
                                <div className='com-btn' id={res.data[i].Id} onClick={handleResult}>Edit</div>
                                <div className='com-btn' id={res.data[i].Id} onClick={handleResult} style={{marginLeft: '1em'}}>Delete</div>
                                <div className='com-btn' id={res.data[i].Id} onClick={handleResult} style={{marginLeft: '1em'}}>Show</div>
                            </div>)
                        })
                    }

                }
            }
            setComments(data)
            setCommentLoading(false)
        })
    }, [])



    const greeting = (hour) => {
        if (hour < 12 && hour > 5) {
            return 'Good morning, '
        } else if (hour < 18) {
            return 'Good afternoon, '
        } else if (hour < 20) {
            return 'Good evening, '
        } else {
            return 'Good night, '
        }
    }

    return (
        <>
            <div className="ui-content">
                <div className="ui-greeting">
                    {greeting(new Date().getHours()) + props.username}!
                </div>

                <div className="ui-title">History</div>
                <div className="ui-table">
                    <Table pagination={{ position: ['bottomCenter'] }} tableLayout='auto' size='middle' loading={historyLoading} columns={historyColumns} dataSource={historyData} />
                </div>

                <div className="ui-title">Comments</div>
                <div className="ui-table">
                    <Table pagination={{ position: ['bottomCenter'] }} tableLayout='auto' size='middle' loading={commentLoading} columns={commentsColumns} dataSource={comments} />
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

export default connect(mapStateToProps)(UserInfo)
