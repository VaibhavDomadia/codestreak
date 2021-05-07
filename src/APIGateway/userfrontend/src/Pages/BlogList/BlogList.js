import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogList.css';
import { useHistory } from 'react-router';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';
import Pagination from '../../Components/Pagination/Pagination';

const BlogList = (props) => {
    const [blogs, setBlogs] = useState(null);
    const history = useHistory();
    const [numberOfBlogs, setNumberOfBlogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 2;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/blog/blogs?page=${currentPage}`);

                setBlogs(response.data.blogs);
                setNumberOfBlogs(response.data.totalNumberOfBlogs);
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

        fetchBlogs();
    }, [currentPage]);

    let allBlogs = null;
    if(blogs) {
        allBlogs = (
            <div className='BlogList-Container'>
                <div className='BlogList-Header'>
                    <div className='BlogList-Header-Title'>
                        { blogs.length === 0 ? 'No Blogs Found' : 'All Blogs'}
                    </div>
                </div>
                <div className='BlogList-Blog-Container'>
                    {
                        blogs.map(blog => {
                            return (
                                <div key={blog._id} className='BlogList-Blog'>
                                    <BlogTile blog={blog}/>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    numberOfItems={numberOfBlogs}
                    itemsPerPage={blogsPerPage}/>
            </div>
        )
    }

    return allBlogs;
}

export default BlogList;