import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';
import Spinner from '../../Components/Spinner/Spinner';
import './UserBlogs.css';

const UserBlogs = (props) => {
    const [blogs, setBlogs] = useState(null);

    const userID = props.match.params.userID;

    const history = useHistory();

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await axios.get(`/api/blog/user/${userID}`);

                setBlogs(response.data.blogs);
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

        fetchUserBlogs();
    }, [userID]);

    let userBlogs = <Spinner/>;
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