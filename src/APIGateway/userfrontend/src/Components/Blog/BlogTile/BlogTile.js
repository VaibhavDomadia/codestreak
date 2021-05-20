import React from 'react';
import { Link } from 'react-router-dom';
import './BlogTile.css';

import CommentsIcon from '../../../Icons/comment-dots-regular.svg';
import ViewsIcon from '../../../Icons/eye-regular.svg';
import { getDate } from '../../../util/helper';

const BlogTile = (props) => {
    const { blog } = props;
    return (
        <Link to={`/blog/${blog._id}`} className='BlogTile-Container'>
            <div className='BlogTile-Title'>
                {blog.title}
            </div>
            <div className='BlogTile-Stats-Container'>
                <div className='BlogTile-Stats'>
                    <img src={ViewsIcon} alt='Views' className='BlogTile-Stats-Icon'></img>
                    <div className='BlogTile-Stats-Value'>{blog.views}</div>
                </div>
                <div className='BlogTile-Stats'>
                    <img src={CommentsIcon} alt='Comments' className='BlogTile-Stats-Icon'></img>
                    <div className='BlogTile-Stats-Value'>{blog.numberOfComments}</div>
                </div>
            </div>
            <div className='BlogTile-BlogInfo'>
                <div className='BlogTile-CreationInfo'>
                    Created By:
                    <Link to={`/user/${blog.userID}`} className='BlogTile-CreationInfo-Value'>
                        {blog.handle}
                    </Link>
                    at:
                    <div className='BlogTile-CreationInfo-Value'>
                        {getDate(blog.createdAt)}
                    </div>
                </div>
                <div className='blogTile-Tags-Container'>
                    <div className='BlogTile-Tag-Title'>
                        Tags:
                    </div>
                    <div className='BlogTile-Tag-Value'>
                        {blog.tags.join(', ')}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogTile;