import React, { useState } from 'react';
import { getDateAndTime } from '../../util/helper';
import './Comment.css';
import ProfileIcon from '../../Icons/user-circle-solid.svg';
import CommentsIcon from '../../Icons/comment-dots-solid.svg';
import EditIcon from '../../Icons/pen-solid-dark.svg';
import DeleteIcon from '../../Icons/trash-solid-dark.svg';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';

const Comment = (props) => {
    const { comment, userID } = props;
    const [showReply, setShowReply] = useState(false);

    const toggleShowReply = () => {
        setShowReply(showReply => !showReply);
    }

    return (
        <div className='Comment'>
            <div className='Comment-Info-Container'>
                <img src={ProfileIcon} alt='ProfileImage' className='Comment-Info-ProfileImage'></img>
                <Link to={`/user/${comment.userID}`} className='Comment-Info-Handle'>
                    {comment.handle}
                </Link>
                <div className='Comment-Info-CreatedAt'>
                    Written At: {getDateAndTime(comment.createdAt)}
                </div>
            </div>
            <div className='Comment-Content-Container'>
                <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                    {comment.content}
                </ReactMarkdown>
            </div>
            <div className='Comment-Controls'>
                <div className='Comment-Controls-Field' onClick={toggleShowReply}>
                    <img src={CommentsIcon} alt='Comment' className='Comment-Icon'></img>
                    <div className='Comment-Controls-Field-Value'>
                        {
                            showReply ? 'Hide Replies' : 'Show Replies'
                        }
                    </div>
                </div>
                {
                    userID &&
                    <div className='Comment-Controls-Field'>
                        <img src={EditIcon} alt='Edit' className='Comment-Icon'></img>
                        <div className='Comment-Controls-Field-Value'>Edit</div>
                    </div>
                }
                {
                    userID &&
                    <div className='Comment-Controls-Field'>
                        <img src={DeleteIcon} alt='Delete' className='Comment-Icon'></img>
                        <div className='Comment-Controls-Field-Value'>Delete</div>
                    </div>
                }
            </div>
            {
                showReply &&
                <div className='Reply-Container'>
                    {
                        comment.replies.map(reply => {
                            return (
                                <div key={reply._id} className='Reply'>
                                    <div className='Reply-Info-Container'>
                                        <img src={ProfileIcon} alt='ProfileImage' className='Reply-Info-ProfileImage'></img>
                                        <Link to={`/user/${reply.userID}`} className='Reply-Info-Handle'>
                                            {reply.handle}
                                        </Link>
                                        <div className='Reply-Info-CreatedAt'>
                                            Written At: {getDateAndTime(reply.createdAt)}
                                        </div>
                                    </div>
                                    <div className='Reply-Content-Container'>
                                        <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                                            {reply.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Comment;