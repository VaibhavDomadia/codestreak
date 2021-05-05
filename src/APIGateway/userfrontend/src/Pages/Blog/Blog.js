import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Blog.css';
import ProfileIcon from '../../Icons/user-circle-solid.svg';
import LikesIcon from '../../Icons/thumbs-up-regular.svg';
import DislikesIcon from '../../Icons/thumbs-down-regular.svg';
import CommentsIcon from '../../Icons/comment-dots-regular.svg';
import ViewsIcon from '../../Icons/eye-regular.svg';
import { getDateAndTime } from '../../util/helper';
import { Link } from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';

const Blog = (props) => {
    const [blog, setBlog] = useState(null);

    const blogID = props.match.params.blogID;

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await axios.get(`/api/blog/${blogID}`);

            setBlog(response.data.blog);
        }

        fetchBlog();
    }, [blogID]);

    console.log(blog);

    let renderBlog = null;
    if(blog) {
        renderBlog = (
            <div className='Blog-Container'>
                <div className='Blog-Title'>{blog.title}</div>
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
                    <div className='Blog-Likes'>
                        <img src={LikesIcon} alt='Likes' className='Blog-Likes-Icon'></img>
                        <div className='Blog-Likes-Value'>{blog.likes}</div>
                    </div>
                    <div className='Blog-Dislikes'>
                        <img src={DislikesIcon} alt='Dislikes' className='Blog-Dislikes-Icon'></img>
                        <div className='Blog-Dislikes-Value'>{blog.dislikes}</div>
                    </div>
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
                    {
                        blog.comments.map(comment => {
                            return <Comment key={Comment._id} comment={comment}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return renderBlog;
}

export default Blog;