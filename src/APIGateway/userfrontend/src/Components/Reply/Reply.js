import React, { useState } from 'react';
import { getDateAndTime } from '../../util/helper';
import './Reply.css';

import EditIcon from '../../Icons/pen-solid-dark.svg';
import DeleteIcon from '../../Icons/trash-solid-dark.svg';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';
import { Link } from 'react-router-dom';
import MarkdownEditorComment from '../MarkdownEditorComment/MarkdownEditorComment';
import ProfileImage from '../ProfileImage/ProfileImage';

const Reply = (props) => {
    const { reply, userID, commentID, onCommentReplyEdit, onCommentReplyDelete } = props;
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(reply.content);
    const [contentError, setContentError] = useState('');

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    const toggleEditMode = () => {
        setEditMode(currentEditMode => !currentEditMode);
    }

    const onDelete = () => {
        onCommentReplyDelete(commentID, reply._id);
    }

    const onEdit = () => {
        let isErrorPresent = false;
        if(content.trim() === '') {
            setContentError('This Field is Required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            onCommentReplyEdit(commentID, reply._id, content);
            setEditMode(currentEditMode => !currentEditMode);
        }
    }    

    const doesUserWroteReply = userID === reply.userID;
    
    return (
        <div className='Reply'>
            <div className='Reply-Info-Container'>
                <ProfileImage link={`/images/${reply.userID}`} size={32}/>
                <Link to={`/user/${reply.userID}`} className='Reply-Info-Handle'>
                    {reply.handle}
                </Link>
                <div className='Reply-Info-CreatedAt'>
                    Written At: {getDateAndTime(reply.createdAt)}
                </div>
            </div>
            <div className='Reply-Content-Container'>
                {
                    editMode ?
                    <MarkdownEditorComment
                        content={content}
                        onContentChange={onContentChange}
                        error={contentError}
                        saveTitle='Save'
                        onSave={onEdit}/> :
                    <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                        {reply.content}
                    </ReactMarkdown>
                }
            </div>
            <div className='Reply-Controls'>
                {
                    doesUserWroteReply &&
                    <div className='Reply-Controls-Field' onClick={toggleEditMode}>
                        <img src={EditIcon} alt='Edit' className='Reply-Icon'></img>
                        <div className='Reply-Controls-Field-Value'>Edit</div>
                    </div>
                }
                {
                    doesUserWroteReply &&
                    <div className='Reply-Controls-Field' onClick={onDelete}>
                        <img src={DeleteIcon} alt='Delete' className='Reply-Icon'></img>
                        <div className='Reply-Controls-Field-Value'>Delete</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Reply;