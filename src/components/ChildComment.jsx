import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import '../css/Comment.css'
import { CaretDownOutlined } from '@ant-design/icons';
import { FlashAutoRounded } from '@material-ui/icons';
import getDate from './GetDate';
import deepCopy from './Deepcopy';

export default function ChildComment(props) {

    const setReplyTo = props.setReplyTo
    const mentionFocus = props.mentionFocus

    const [cookies, setCookie] = useCookies([''])

    const [comments, setComments] = useState([])
    const [replyFold, setReplyFold] = useState({})

    const sortComments = (comments) => {
        let newComments = deepCopy(comments)
        if (newComments.length > 1) {
            newComments.sort((a, b) => {
                return new Date(b.Datetime) - new Date(a.Datetime)
            })
        }
        return newComments
    }

    useEffect(() => {
        if (props.parentComment.Id === -1) {
            axios({
                method: 'get',
                url: `${props.server}/api/comments/getCommentsByModel/${props.model.Id}`
            }).then(res => {
                setComments(sortComments(res.data))
            })
        } else {
            const cook = cookies['replyFold']
            if (!cook || (cook && cook[props.parentComment.Id])) {
                axios({
                    method: 'get',
                    url: `${props.server}/api/comments/getCommentsByParentId/${props.parentComment.Id}`
                }).then(res => {
                    setComments(sortComments(res.data))
                })
            }

        }

    }, [props])

    useEffect(() => {
        if (cookies['replyFold']) {
            setReplyFold(cookies['replyFold'])
        }
    }, [])

    const handleShowReply = e => {
        const tmp = JSON.parse(JSON.stringify(replyFold))
        tmp[e.currentTarget.id] = !replyFold[e.currentTarget.id]
        setCookie('replyFold', tmp, { expires: new Date(new Date().getTime + 2 * 3600 * 1000) })
        setReplyFold(tmp)
    }

    const handleReply = (cid, username) => {
        mentionFocus()
        setReplyTo({cid, username})
    }

    const handleDeleteComment = (e) => {
        console.log(e.target.id)
    }


    return (
        <>
            {comments && comments.length > 0 ? comments.map(comment => {
                return (
                    <div className='comments' key={comment.Id}>
                        <div className="main-comment">
                            <div className="main-commenter" id={comment.Id} onClick={handleShowReply}>
                                <div className={`user-name${comment.User.Type==='Regular' ? '' : '-prime'}`}>@{comment.User.Username}</div>
                                &nbsp;{props.parentComment.Id === -1 ? '' : 'replies to'}
                                {
                                    props.parentComment.Id === -1 ? '' : (
                                        <div className={`user-name${comment.User.Type && comment.User.Type==='Regular' ? '' : '-prime'}`}>&nbsp;{`@${props.parentComment.User.Username}`}</div>
                                    )
                                }
                                <div className={`comment-icon${replyFold[comment.Id] ? '-down' : ''}`} hidden={!comment.ChildComment || comment.ChildComment.length === 0}>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                            <div className="main-comment-content" id={comment.Id} onClick={handleShowReply}>
                                {comment.Comment}
                            </div>
                            {comment.Image ? (
                                <div className="main-comment-img" id={comment.Id} onClick={handleShowReply}>
                                    img here
                                </div>
                            ) : null}

                            <div className="comment-bot-bar">
                                <div className="comment-datetime">
                                    {getDate(comment.Datetime)}
                                </div>
                                <div className="comment-reply-btn" id={comment.Id} onClick={() => handleReply(comment.Id, comment.User.Username)}>
                                    Reply
                                </div>
                                <div className="comment-reply-btn" id={comment.Id} onClick={handleDeleteComment}>
                                    Delete
                                </div>
                            </div>

                        </div>

                        {comment.ChildComment && comment.ChildComment.length > 0 && replyFold[comment.Id] === true ? (
                            <div className='reply-comment'>
                                <ChildComment parentComment={comment} model={props.modelId} server={props.server} uid={props.uid} username={props.username} email={props.email} setReplyTo={setReplyTo}  mentionFocus={mentionFocus}/>
                            </div>
                        ) : null}

                    </div>
                )
            }) : ''}
        </>
    )
}
