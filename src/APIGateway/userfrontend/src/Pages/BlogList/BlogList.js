import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogList.css';
import { useHistory } from 'react-router';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';
import Pagination from '../../Components/Pagination/Pagination';
import DarkLinkIconButton from '../../Components/DarkLinkIconButton/DarkLinkIconButton';
import AddIcon from '../../Icons/plus-solid.svg';
import TagInput from '../../Components/TagInput/TagInput';
import SortBy from '../../Components/SortBy/SortBy';
import Spinner from '../../Components/Spinner/Spinner';

const BlogList = (props) => {
    const [blogs, setBlogs] = useState(null);
    const history = useHistory();
    const [numberOfBlogs, setNumberOfBlogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    const [filterTags, setFilterTags] = useState([]);
    const [sortSelected, setSortSelected] = useState('Creation Time');
    const [sortOrder, setSortOrder] = useState(1);

    const onSortSelectedChange = (value) => {
        if(value === sortSelected) {
            setSortOrder(currentOrder => 1 - currentOrder);
        }
        else {
            setSortSelected(value);
            setSortOrder(1);
        }
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                let sortBy = 'createdAt';
                if(sortSelected === 'Title') {
                    sortBy = 'title';
                }
                else if(sortSelected === 'Views') {
                    sortBy = 'views';
                }
                else if(sortSelected === 'Interactivity') {
                    sortBy = 'numberOfComments';
                }

                if(sortOrder === 1) {
                    sortBy = `-${sortBy}`
                }

                let filterQuery = '';
                if(filterTags.length !== 0) {
                    filterQuery = `&tags=${filterTags.join(',')}`
                }

                const response = await axios.get(`/api/blog/blogs?page=${currentPage}&sort=${sortBy}${filterQuery}`);

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
    }, [currentPage, filterTags, sortSelected, sortOrder]);

    let allBlogs = <Spinner/>;
    if(blogs) {
        allBlogs = (
            <div className='BlogList-Container'>
                <div className='BlogList-Header'>
                    <div className='BlogList-Header-Top'>
                        <div className='BlogList-Header-Title'>
                            All Blogs
                        </div>
                        <DarkLinkIconButton to='/create/blog' icon={AddIcon} alt='Add' title='New Blog'/>
                    </div>
                    <TagInput
                        tags={filterTags}
                        setTags={setFilterTags}
                        placeholder='Search for tags, (e.g. Stack, tree, graph)'/>
                    <div className='BlogTile-Header-SortBy'>
                        <SortBy
                            values={['Creation Time', 'Title', 'Views', 'Interactivity']}
                            order={sortOrder}
                            selected={sortSelected}
                            setSelected={onSortSelectedChange}/>
                    </div>
                </div>
                {
                    blogs.length === 0 ?
                    <div className='BlogList-NoBlogsFound'>
                        No Blogs Found
                    </div> :
                    <div className='BlogList-BlogsFound'>
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
                }
            </div>
        )
    }

    return allBlogs;
}

export default BlogList;