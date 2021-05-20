import React, { useEffect, useState } from 'react';
import './Editorial.css';
import CommentsIcon from '../../Icons/comment-dots-regular.svg';
import ViewsIcon from '../../Icons/eye-regular.svg';
import DeleteIcon from '../../Icons/trash-solid.svg';
import EditIcon from '../../Icons/pen-solid.svg';
import { getDateAndTime } from '../../util/helper';
import { Link, useHistory } from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';
import { getUserID } from '../../util/authentication';
import DarkSmallIconButton from '../../Components/DarkSmallIconButton/DarkSmallIconButton';
import DarkSmallLinkIconButton from '../../Components/DarkSmallLinkIconButton/DarkSmallLinkIconButton';
import MarkdownEditorComment from '../../Components/MarkdownEditorComment/MarkdownEditorComment';
import axiosInterceptor from '../../util/interceptor';
import axios from 'axios';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import Spinner from '../../Components/Spinner/Spinner';

const Editorial = (props) => {
    const [editorial, setEditorial] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentContentError, setCommentContentError] = useState('');

    const editorialID = props.match.params.editorialID;

    const history = useHistory();

    useEffect(() => {
        const fetchEditorial = async () => {
            try {
                const response = await axios.get(`/api/editorial/${editorialID}`);

                setEditorial(response.data.editorial);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        fetchEditorial();
    }, [editorialID]);

    const onDeleteEditorial = async () => {
        try {
            const response = await axiosInterceptor.delete(`/api/editorial/${editorial._id}`);

            history.push(`/problem/${editorial.problemID}`);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onCommentContentChange = (event) => {
        setCommentContentError('');
        setCommentContent(event.target.value);
    }

    const onComment = async () => {
        let isErrorPresent = false;
        if(commentContent.trim() === '') {
            setCommentContentError('This Field is Required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            try {
                const response = await axiosInterceptor.post(`/api/editorial/${editorialID}/comment`, {
                    content: commentContent
                });

                setEditorial(response.data.editorial);
                setCommentContent('');
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Editorial'});
                }
                else if(error.response.status === 403) {
                    history.push('/403');
                }
                else if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    history.push('/404');
                }
            }
        }
    }

    const onCommentEdit = async (commentID, value) => {
        try {
            const response = await axiosInterceptor.put(`/api/editorial/${editorialID}/comment/${commentID}`, {
                content: value
            });

            setEditorial(response.data.editorial);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onCommentDelete = async (commentID) => {
        try {
            const response = await axiosInterceptor.delete(`/api/editorial/${editorialID}/comment/${commentID}`);

            setEditorial(response.data.editorial);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onReply = async (commentID, value) => {
        try {
            const response = await axiosInterceptor.post(`/api/editorial/${editorialID}/comment/${commentID}/reply`, {
                content: value
            });

            setEditorial(response.data.editorial);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onReplyEdit = async (commentID, replyID, value) => {
        try {
            const response = await axiosInterceptor.put(`/api/editorial/${editorialID}/comment/${commentID}/reply/${replyID}`, {
                content: value
            });

            setEditorial(response.data.editorial);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onReplyDelete = async (commentID, replyID) => {
        try {
            const response = await axiosInterceptor.delete(`/api/editorial/${editorialID}/comment/${commentID}/reply/${replyID}`);

            setEditorial(response.data.editorial);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Editorial'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    let renderEditorial = <Spinner/>;
    if(editorial) {
        const renderComments = [...editorial.comments];
        renderComments.reverse();
        
        const userID = getUserID(localStorage.getItem('token'));
        const doesUserWroteEditorial = userID === editorial.userID;

        renderEditorial = (
            <div className='Editorial-Container'>
                <div className='Editorial-Header'>
                    <div className='Editorial-Header-Title'>{editorial.title}</div>
                    {doesUserWroteEditorial && <DarkSmallLinkIconButton to={`/edit/editorial/${editorial._id}`} icon={EditIcon} alt='Edit' title='Edit'/>}
                    {doesUserWroteEditorial && <DarkSmallIconButton icon={DeleteIcon} alt='Delete' title='Delete' onClick={onDeleteEditorial}/>}
                </div>
                
                <div className='Editorial-Info-Container'>
                    <ProfileImage link={`/images/${editorial.userID}`} size={32}/>
                    <Link to={`/user/${editorial.userID}`} className='Editorial-Info-Handle'>
                        {editorial.handle}
                    </Link>
                    <div className='Editorial-Info-CreatedAt'>
                        Created At: {getDateAndTime(editorial.createdAt)}
                    </div>
                    <div className='Editorial-Info-ProblemName'>
                        For: <Link to={`/problem/${editorial.problemID}`} className='Editorial-Info-Problem-Link'>{editorial.problemName}</Link>
                    </div>
                    <div className='Editorial-Views'>
                        <img src={ViewsIcon} alt='Views' className='Editorial-Views-Icon'></img>
                        <div className='Editorial-Views-Value'>{editorial.views}</div>
                    </div>
                </div>
                <div className='Editorial-Tags-Container'>
                    <div className='Editorial-Tags-Title'>Tags:</div>
                    {
                        editorial.tags.length === 0 ?
                        <div className='Editorials-NoTags'>
                            No Tags
                        </div> :
                        <div className='Editorials-Tags'>
                            {
                                editorial.tags.map(tag => {
                                    return <div key={tag} className='Editorial-Tag'>{tag}</div>
                                })
                            }
                        </div>
                    }
                </div>
                <div className='Editorial-Content-Container'>
                    <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                        {editorial.content}
                    </ReactMarkdown>
                </div>
                <div className='Editorial-Comments-Header'>
                    <img src={CommentsIcon} alt='Comments' className='Editorial-Comment-Icon'></img>
                    Comments: {editorial.numberOfComments}
                </div>
                <div className='Editorial-Comments-Container'>
                    <MarkdownEditorComment
                        content={commentContent}
                        onContentChange={onCommentContentChange}
                        error={commentContentError}
                        saveTitle='Comment'
                        onSave={onComment}/>
                    {
                        renderComments.map(comment => {
                            return (
                                <Comment 
                                    key={comment._id}
                                    comment={comment}
                                    userID={userID}
                                    onCommentEdit={onCommentEdit}
                                    onCommentDelete={onCommentDelete}
                                    onCommentReply={onReply}
                                    onCommentReplyEdit={onReplyEdit}
                                    onCommentReplyDelete={onReplyDelete}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return renderEditorial;
}

export default Editorial;