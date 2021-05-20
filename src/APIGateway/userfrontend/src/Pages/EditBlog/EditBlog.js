import React, { useEffect, useState } from 'react';
import InputError from '../../Components/InputError/InputError';
import MarkdownEditor from '../../Components/MarkdownEditor/MarkdownEditor';
import TagInput from '../../Components/TagInput/TagInput';
import './EditBlog.css';
import EditBlogIcon from '../../Icons/pen-solid.svg';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import { useHistory } from 'react-router';

const EditBlog = (props) => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const history = useHistory();

    const blogID = props.match.params.blogID;

    const onTitleChange = (event) => {
        setTitleError('');
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/${blogID}`);

                const { tags, title, content } = response.data.blog;

                setTags(tags);
                setTitle(title);
                setContent(content);
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

    const onEdit = async () => {
        let isErrorPresent = false;
        if(title.trim() === '') {
            setTitleError('This field is required');
            isErrorPresent = true;
        }
        if(content.trim() === '') {
            setContentError('This field is required');
            isErrorPresent = true;
        }
        if(!isErrorPresent) {
            try {
                const response = await axiosInterceptor.put(`/api/blog/${blogID}`, {
                    title,
                    content,
                    tags
                })

                history.push(`/blog/${blogID}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Blog Page'});
                }
                else if(error.response.status === 403) {
                    history.replace('/403');
                }
                else if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
        }
    }

    return (
        <div className='EditBlog-Container'>
            <div className='EditBlog-Header'>
                <div className='EditBlog-Header-Title'>Edit Blog</div>
                <DarkIconButton icon={EditBlogIcon} alt='EditBlog' title='Edit' onClick={onEdit}/>
            </div>
            <div className='EditBlog-BlogTitle'>
                <div className='EditBlog-BlogTitle-Title'>Title</div>
                <InputError
                    type='text'
                    placeholder='Enter Blog Title....'
                    error={titleError}
                    value={title}
                    onValueChange={onTitleChange}/>
            </div>
            <div className='EditBlog-BlogContent'>
                <div className='EditBlog-BlogContent-Title'>Content</div>
                <MarkdownEditor content={content} onContentChange={onContentChange} error={contentError}/>
            </div>
            <div className='EditBlog-BlogTags'>
                <div className='EditBlog-BlogTags-Title'>Tags</div>
                <TagInput tags={tags} setTags={setTags} placeholder='Add Tags Related to your topic, (e.g. tree, graph)'/>
            </div>
        </div>
    )
}

export default EditBlog;