import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';
import './UserBlogs.css';

const UserBlogs = (props) => {
    const [blogs, setBlogs] = useState(null);

    const userID = props.match.params.userID;

    useEffect(() => {
        const fetchUserBlogs = async () => {
            const response = await axios.get(`/api/blog/user/${userID}`);

            setBlogs(response.data.blogs);
        }

        fetchUserBlogs();
    }, [userID]);

    let userBlogs = null;
    if(blogs) {
        userBlogs = (
            <div className='UserBlogs-Container'>
                <div className='UserBlogs-Title'>All Blogs</div>
                {
                    blogs.length === 0 ?
                    <div className='UserBlogs-NoBlogsWrittenYetBanner'>
                        No Blogs Made By The User Yet
                    </div> :
                    <div className='UserBlogs-BlogsContainer'>
                        {
                            blogs.map(blog => {
                                return (
                                    <div key={blog._id} className='UserBlogs-Blog'>
                                        <BlogTile blog={blog}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }

    return userBlogs;
}

export default UserBlogs;