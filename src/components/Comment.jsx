import React, { useEffect, useRef, useState } from 'react'
import '../css/Comment.css'
import { Button, Mentions, message } from 'antd';
import debounce from './Debounce';
import axios from 'axios';
import ChildComment from './ChildComment';

export default function Comment(props) {

    const mentionRef = useRef(null);
    
    const [mentionLoading, setMentionLoading] = useState(false)
    const [comment, setComment] = useState('')
    const [users, setUsers] = useState([])
    const [rows, setRows] = useState(3)
    const [replyTo, setReplyTo] = useState(null)
    const model = props.model
    const ref = useRef()

    const mentionFocus = () => {
        mentionRef.current.focus()
    }

    const onSearch = (s) => {
        ref.current = s
        setMentionLoading(!!s)
        setUsers([])

        if (!s) {
            setUsers([])
        } else {
            axios({
                method: 'post',
                url: `${props.server}/api/search/getUserByUsername`,
                data: {
                    username: s
                }
            }).then(res => {
                setUsers(res.data.slice(0, 5))
                setMentionLoading(false)
            })
        }
    }

    const onInputChange = input => {
        console.log(input)
        setComment(input)
    }

    const handleFocus = () => {
        setRows(5)
    }

    const handleBlur = () => {
        setRows(3)
    }

    const handleInputChange = debounce(onInputChange, 300)

    const handleSearch = debounce(onSearch, 300)

    const handleCancel = () => {
        setReplyTo(null)
    }

    const onSend = () => {
        if (comment.length < 10) {
            message.error('Comment should be more than 10 letters!')
        } else {
            axios({
                method: 'post',
                url: `${props.server}/api/comments/addComment`,
                data: {
                    comment: comment,
                    replyTo: replyTo ? replyTo.cid : -1,
                    uid: props.uid,
                    mid: model.Id,
                    pid: -1,
                    imgs: null
                }
            }).then(() => {
                // message.success('Comment sent successfully!')
                window.location.reload(false)
            }).catch(err => {
                message.error('Comment sent failed!')
            })
        }
    }

    return (
        <>
            <div className="comment-content">
                <div className="top-comment-bar">
                    <Mentions
                        placeholder={replyTo ? `Reply to: @${replyTo.username}` : ''}
                        className='comment-input-box'
                        rows={rows}
                        ref={mentionRef}
                        loading={mentionLoading}
                        onSearch={handleSearch}
                        options={users.map(({ Uid, Username, Email }) => ({
                            key: Uid,
                            value: Username,
                            className: 'antd-demo-dynamic-option',
                            label: (
                                <span>{Username}</span>
                            )
                        }))}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <div className="top-comment-btn-area">
                        <Button type='primary' style={{marginBottom: '10px'}} onClick={onSend}>Send</Button>
                        <Button type='default' disabled={replyTo ? false : true} onClick={handleCancel}>Cancel</Button>
                    </div>
                    
                </div>

                <div className="comment-area">
                    <ChildComment parentComment={{ Id: -1 }} model={model} server={props.server} uid={props.uid} username={props.username} email={props.email} setReplyTo={setReplyTo} mentionFocus={mentionFocus} />
                </div>
            </div>
        </>
    )
}
