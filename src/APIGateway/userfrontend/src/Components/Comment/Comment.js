import React, { useState } from 'react';
import { getDateAndTime } from '../../util/helper';
import './Comment.css';
import ProfileIcon from '../../Icons/user-circle-solid.svg';
import CommentsIcon from '../../Icons/comment-dots-regular.svg';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';

const Comment = (props) => {
    const { comment } = props;
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
                    Created At: {getDateAndTime(comment.createdAt)}
                </div>
            </div>
            <div className='Comment-Content-Container'>
                <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                    {comment.content}
                </ReactMarkdown>
            </div>
            <div className='Comment-Controls'>
                <div className='Comment-ShowReplyButton' onClick={toggleShowReply}>
                    <img src={CommentsIcon} alt='Comment' className='Comment-Icon'></img>
                    <div className='Comment-ShowReplyButton-Title'>
                        {
                            showReply ? 'Hide Replies' : 'Show Replies'
                        }
                    </div>
                </div>
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
                                            Created At: {getDateAndTime(reply.createdAt)}
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