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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const historyColumns = [
        {
            title: 'Model Name',
            dataIndex: 'modelName',
            key: 'modelName'
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
            align: 'center'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value) => value === null ? '-' : value,
            align: 'center'
        },
        {
            title: 'Probability',
            dataIndex: 'probability',
            key: 'probability',
            render: (value) => value === null ? '-' : value,
            align: 'center'
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

    const handleDelete = e => {
        console.log(e.target.id)
    }



    useEffect(() => {
        if (!props.login) {
            navigate('/')
        }
        setLoading(true)
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
                        fileName: res.data[i].FileName,
                        status: res.data[i].Status === 'Done' ? (<div className='status-done'>Done</div>) : (res.data[i].Status === 'Failed' ? <div className='status-failed'>Failed</div> : <div className='status'>{res.data[i].Status}</div>),
                        value: res.data[i].Value,
                        probability: res.data[i].Prob,
                        date: res.data[i].Datetime,
                        action: res.data[i].Status === 'Processing' ? null : (<div className='delete-job-btn' id={res.data[i].Id} onClick={handleDelete}>Delete</div>)
                    })
                }
            }

            setHistoryData(data)
            setLoading(false)

        })
    }, [])

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;



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
                <div className="ui-text">
                    <Table rowSelection={rowSelection} pagination={{position: ['bottomCenter']}} tableLayout='auto' size='large' loading={loading} columns={historyColumns} dataSource={historyData} />
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
