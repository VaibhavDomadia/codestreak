import React, { useState } from 'react';
import { getDateAndTime } from '../../util/helper';
import './Comment.css';
import CommentsIcon from '../../Icons/comment-dots-solid.svg';
import EditIcon from '../../Icons/pen-solid-dark.svg';
import DeleteIcon from '../../Icons/trash-solid-dark.svg';
import ReplyIcon from '../../Icons/reply-solid.svg';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';
import MarkdownEditorComment from '../MarkdownEditorComment/MarkdownEditorComment';
import Reply from '../Reply/Reply';
import ProfileImage from '../ProfileImage/ProfileImage';

const Comment = (props) => {
    const { comment, userID, onCommentEdit, onCommentDelete, onCommentReply, onCommentReplyEdit, onCommentReplyDelete } = props;
    const [showReply, setShowReply] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [contentError, setContentError] = useState('');
    const [replyEditor, setReplyEditor] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replyContentError, setReplyContentError] = useState('');

    const doesUserWroteComment = comment.userID === userID;

    const toggleShowReply = () => {
        setShowReply(showReply => !showReply);
    }

    const toggleEditMode = () => {
        setEditMode(currentEditMode => !currentEditMode);
    }

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    const onEdit = () => {
        let isErrorPresent = false;
        if(content.trim() === '') {
            setContentError('This Field is Required');
            isErrorPresent = true;
        }
        if(!isErrorPresent) {
            onCommentEdit(comment._id, content);
            setEditMode(currentEditMode => !currentEditMode);
        }
    }

    const onDelete = () => {
        onCommentDelete(comment._id);
    }

    const toggleReplyEditor = () => {
        setReplyEditor(replyEditor => !replyEditor);
    }

    const onReplyContentChange = (event) => {
        setReplyContentError('');
        setReplyContent(event.target.value);
    }

    const onReply = () => {
        let isErrorPresent = false;
        if(replyContent.trim() === '') {
            setReplyContentError('This Field is Required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            onCommentReply(comment._id, replyContent);
            setShowReply(true);
            setReplyContent('');
            setReplyEditor(false);
        }
    }

    const renderReplies = [...comment.replies];
    renderReplies.reverse();

    return (
        <div className='Comment'>
            <div className='Comment-Info-Container'>
                <ProfileImage link={`/images/${comment.userID}`} size={32}/>
                <Link to={`/user/${comment.userID}`} className='Comment-Info-Handle'>
                    {comment.handle}
                </Link>
                <div className='Comment-Info-CreatedAt'>
                    Written At: {getDateAndTime(comment.createdAt)}
                </div>
            </div>
            <div className='Comment-Content-Container'>
                {
                    editMode ?
                    <MarkdownEditorComment
                        content={content}
                        onContentChange={onContentChange}
                        error={contentError}
                        saveTitle='Save'
                        onSave={onEdit}/> :
                    <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                        {comment.content}
                    </ReactMarkdown>
                }
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
                <div className='Comment-Controls-Field' onClick={toggleReplyEditor}>
                    <img src={ReplyIcon} alt='Reply' className='Comment-Icon'></img>
                    <div className='Comment-Controls-Field-Value'>Reply</div>
                </div>
                {
                    doesUserWroteComment &&
                    <div className='Comment-Controls-Field' onClick={toggleEditMode}>
                        <img src={EditIcon} alt='Edit' className='Comment-Icon'></img>
                        <div className='Comment-Controls-Field-Value'>Edit</div>
                    </div>
                }
                {
                    doesUserWroteComment &&
                    <div className='Comment-Controls-Field' onClick={onDelete}>
                        <img src={DeleteIcon} alt='Delete' className='Comment-Icon'></img>
                        <div className='Comment-Controls-Field-Value'>Delete</div>
                    </div>
                }
            </div>
            {
                replyEditor &&
                <div className='Comment-Reply-Editor'>
                    <MarkdownEditorComment
                        content={replyContent}
                        onContentChange={onReplyContentChange}
                        error={replyContentError}
                        saveTitle='Reply'
                        onSave={onReply}/>
                </div>
            }
            {
                showReply &&
                <div className='Reply-Container'>
                    {
                        renderReplies.map(reply => {
                            return (
                                <Reply
                                    key={reply._id}
                                    reply={reply}
                                    userID={userID}
                                    commentID={comment._id}
                                    onCommentReplyEdit={onCommentReplyEdit}
                                    onCommentReplyDelete={onCommentReplyDelete}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Comment;