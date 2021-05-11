import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import './Blog.css';
import ProfileIcon from '../../Icons/user-circle-solid.svg';
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

const Blog = (props) => {
    const [blog, setBlog] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentContentError, setCommentContentError] = useState('');

    const blogID = props.match.params.blogID;

    const history = useHistory();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/${blogID}`);

                setBlog(response.data.blog);
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

        fetchBlog();
    }, [blogID]);

    const onDeleteBlog = async () => {
        try {
            const response = await axiosInterceptor.delete(`/api/blog/${blog._id}`);

            history.push('/blog');
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Blog'});
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

    console.log(commentContent);

    const onComment = async (event) => {
        let isErrorPresent = false;
        if(commentContent.trim() === '') {
            setCommentContentError('This Field is Required');
            isErrorPresent = true;
        }
        if(!isErrorPresent) {
            try {
                const response = await axiosInterceptor.post(`/api/blog/${blogID}/comment`, {content: commentContent});

                setBlog(response.data.blog);
            }
            catch(error) {
                console.log('What is wrong');
                console.log(error);
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Blog'});
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

    let renderBlog = null;
    if(blog) {
        const userID = getUserID(localStorage.getItem('token'));
        const doesUserWroteBlog = userID === blog.userID;
        renderBlog = (
            <div className='Blog-Container'>
                <div className='Blog-Header'>
                    <div className='Blog-Header-Title'>{blog.title}</div>
                    {doesUserWroteBlog && <DarkSmallLinkIconButton to={`/edit/blog/${blog._id}`} icon={EditIcon} alt='Edit' title='Edit'/>}
                    {doesUserWroteBlog && <DarkSmallIconButton icon={DeleteIcon} alt='Delete' title='Delete' onClick={onDeleteBlog}/>}
                </div>
                
                <div className='Blog-Info-Container'>
                    <img src={ProfileIcon} alt='ProfileImage' className='Blog-Profile-Image'></img>
                    <Link to={`/user/${blog.userID}`} className='Blog-Info-Handle'>
                        {blog.handle}
                    </Link>
                    <div className='Blog-Info-CreatedAt'>
                        Created At: {getDateAndTime(blog.createdAt)}
                    </div>
                    <div className='Blog-Views'>
                        <img src={ViewsIcon} alt='Views' className='Blog-Views-Icon'></img>
                        <div className='Blog-Views-Value'>{blog.views}</div>
                    </div>
                </div>
                <div className='Blog-Tags-Container'>
                    <div className='Blog-Tags-Title'>Tags:</div>
                    {
                        blog.tags.length === 0 ?
                        <div className='Blogs-NoTags'>
                            No Tags
                        </div> :
                        <div className='Blogs-Tags'>
                            {
                                blog.tags.map(tag => {
                                    return <div key={tag} className='Blog-Tag'>{tag}</div>
                                })
                            }
                        </div>
                    }
                </div>
                <div className='Blog-Content-Container'>
                    <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                        {blog.content}
                    </ReactMarkdown>
                </div>
                <div className='Blog-Comments-Header'>
                    <img src={CommentsIcon} alt='Comments' className='Blog-Comment-Icon'></img>
                    Comments: {blog.numberOfComments}
                </div>
                <div className='Blog-Comments-Container'>
                    <MarkdownEditorComment
                        content={commentContent}
                        onContentChange={onCommentContentChange}
                        error={commentContentError}
                        saveTitle='Comment'
                        onSave={onComment}/>
                    {
                        blog.comments.map(comment => {
                            return <Comment key={comment._id} comment={comment} userID={userID}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return renderBlog;
}

export default Blog;