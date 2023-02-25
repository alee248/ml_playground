import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { connect } from 'react-redux'
import '../css/UserInfo.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Table, message, Popconfirm, Popover } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

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


function UserInfo(props) {

    const [cookies, setCookie] = useCookies([''])

    const navigate = useNavigate()
    const [history, setHistory] = useState([])
    const [historyData, setHistoryData] = useState([])
    const [comments, setComments] = useState([])
    const [historyLoading, setHistoryLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [historyFold, setHistoryFold] = useState(false)
    const [commentsFold, setCommentsFold] = useState(false)

    const getDate = d => {
        let res = ''
        let datetime = new Date(d)
        let year = datetime.getFullYear()
        let month = datetime.getMonth()
        let day = datetime.getDay()
        let time = datetime.toString().substring(16, 21)

        return month + '/' + day + '/' + year.toString().substring(2) + ' ' + time
    }

    const handleSort = (tablename, fieldname) => {
        switch (tablename) {
            case 'history':
                if (fieldname === 'modelName' || fieldname === 'status') {
                    historyData.sort((a, b) => {
                        if (a[fieldname].props.children < b[fieldname].props.children) {
                            return -1
                        }
                        if (a[fieldname].props.children > b[fieldname].props.children) {
                            return 1
                        }
                        return 0
                    })
                    setHistoryData([...historyData])
                }
                else if (fieldname === 'date') {
                    historyData.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date)
                    })
                    setHistoryData([...historyData])
                } else {
                    historyData.sort((a, b) => {

                        if (a[fieldname] < b[fieldname]) {
                            return -1
                        }
                        if (a[fieldname] > b[fieldname]) {
                            return 1
                        }
                        return 0
                    })

                    setHistoryData([...historyData])
                }
                break

            case 'comments':

                break

            default:
                break
        }
    }

    const historyColumns = [
        {
            title: <Popover content="Click to sort" trigger='hover'><div className='table-field' onClick={() => handleSort('history', 'modelName')}>Model</div></Popover>,
            dataIndex: 'modelName',
            key: 'modelName'
        },
        {
            title: <Popover content="Click to sort" trigger='hover'><div className='table-field' onClick={() => handleSort('history', 'version')}>Version</div></Popover>,
            dataIndex: 'version',
            key: 'version',
            width: 80,
            align: 'center'
        },
        {
            title: <Popover content="Click to sort" trigger='hover'><div className='table-field' onClick={() => handleSort('history', 'fileName')}>File Names</div></Popover>,
            dataIndex: 'fileName',
            key: 'fileName',
            align: 'center'
        },
        {
            title: <Popover content="Click to sort" trigger='hover'><div className='table-field' onClick={() => handleSort('history', 'status')}>Status</div></Popover>,
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 50
        },
        {
            title: 'Results',
            dataIndex: 'results',
            key: 'results',
            align: 'center',
            width: 70
        },
        {
            title: <Popover content="Click to sort" trigger='hover'><div className='table-field' onClick={() => handleSort('history', 'date')}>Date</div></Popover>,
            dataIndex: 'date',
            key: 'date',
            align: 'center'
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

    const handleShowResult = e => {
        navigate(`/userinfo/results?rid=${e.target.id}`)
    }

    const handleResult = e => {
        const id = e.target.id
        console.log(id)
    }

    const handleDeleteResult = (id, disabled) => {
        // if (!disabled) {
        //     // delete record
        //     axios({
        //         method: 'get',
        //         url: `${props.server}/api/results/delete/${id}`
        //     }).then(res => {
        //         if (res.data && res.data.result === 'succeed') {
        //             message.success('Successfully deleted!')
        //             window.location.reload(false)
        //         }
        //     })
        // }
    }

    const handleFoldHistory = () => {
        setCookie('hf', !historyFold, { expires: new Date(new Date().getTime + 2 * 3600 * 1000) })
        setHistoryFold(!historyFold)
    }

    const handleFoldComments = () => {
        setCookie('cf', !commentsFold, { expires: new Date(new Date().getTime + 2 * 3600 * 1000) })
        setCommentsFold(!commentsFold)
    }

    const handleHistoryConfirm = (id, disabled) => {
        if (!disabled) {
            // delete record
            axios({
                method: 'get',
                url: `${props.server}/api/results/delete/${id}`
            }).then(res => {
                if (res.data && res.data.result === 'succeed') {
                    window.location.reload(false)
                }
            })
        }
    }

    const handleHistoryCancel = e => {

    }

    useEffect(() => {
        if (!props.login) {
            navigate('/')
        }

        if (cookies['hf'] !== undefined && cookies['hf'] === 'true') {
            setHistoryFold(true)
        }

        if (cookies['cf'] !== undefined && cookies['cf'] === 'true') {
            setCommentsFold(true)
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
                    let filenames = JSON.parse(res.data[i].FileName).filenames
                    let filename = ''
                    if (filenames.length > 1) {
                        filename = `${filenames[0]}...`
                    } else {
                        filename = filenames[0]
                    }
                    data.push({
                        key: res.data[i].Id,
                        modelName: (<a href={`/models/${res.data[i].Model.Id}`}>{res.data[i].Model.Name}</a>),
                        version: res.data[i].Model.Version,
                        fileName: filename,
                        status: res.data[i].Status === 'Done' ? (<div className='status-done'>Done</div>) : (res.data[i].Status === 'Failed' ? <div className='status-failed'>Failed</div> : <div className='status'>{res.data[i].Status}</div>),
                        results: res.data[i].Status === 'Done' || res.data[i].Status === 'Failed' ? (<div className='res-pg-btn' id={res.data[i].Id} onClick={handleShowResult}>Result</div>) : '-',
                        date: getDate(res.data[i].Datetime),
                        action: res.data[i].Status !== 'Processing' ? (
                            <Popconfirm
                                title="Delete confirm"
                                description="Are you sre to delete this task?"
                                onConfirm={() => handleHistoryConfirm(res.data[i].Id, res.data[i].Status !== 'Processing' ? 0 : 1)}
                                onCancel={handleHistoryCancel}
                                okText="yes"
                                cancelText="No"
                            >
                                <div className='delete-job-btn'
                                    id={res.data[i].Id}
                                    onClick={() => handleDeleteResult(res.data[i].Id, res.data[i].Status !== 'Processing' ? 0 : 1)}
                                >
                                    Delete
                                </div>
                            </Popconfirm>
                        ) : (
                            <div className='delete-job-btn-disabled'
                                id={res.data[i].Id} onClick={() => handleDeleteResult(res.data[i].Id, res.data[i].Status !== 'Processing' ? 0 : 1)}
                            >
                                Delete
                            </div>
                        )
                    })
                }
            }

            data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })

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
                                <div className='com-delete-btn' id={res.data[i].Id} onClick={handleResult}>Delete</div>
                                <div className='com-btn' id={res.data[i].Id} onClick={handleResult} style={{ marginLeft: '1em' }}>Show</div>
                            </div>)
                        })
                    }

                }
            }
            setComments(data)
            setCommentLoading(false)
        })
    }, [])

    return (
        <>
            <div className="ui-content">
                <div className="ui-greeting">
                    {greeting(new Date().getHours()) + props.username}!
                </div>

                <div className="ui-title" onClick={handleFoldHistory}>
                    History
                    <div className={`ui-title-icon${historyFold ? '-down' : ''}`}>
                        <CaretRightOutlined />
                    </div>
                </div>
                <div className={`ui-table${historyFold ? '-folded' : ''}`}>
                    <Table pagination={{ position: ['bottomCenter'] }} tableLayout='auto' size='middle' loading={historyLoading} columns={historyColumns} dataSource={historyData} />
                </div>

                <div className="ui-title" onClick={handleFoldComments}>
                    Comments
                    <div className={`ui-title-icon${commentsFold ? '-down' : ''}`}>
                        <CaretRightOutlined />
                    </div>
                </div>
                <div className={`ui-table${commentsFold ? '-folded' : ''}`}>
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