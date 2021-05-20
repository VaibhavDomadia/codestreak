import React, { useState } from 'react';
import InputError from '../../Components/InputError/InputError';
import MarkdownEditor from '../../Components/MarkdownEditor/MarkdownEditor';
import TagInput from '../../Components/TagInput/TagInput';
import './CreateBlog.css';
import CreateBlogIcon from '../../Icons/paper-plane-solid.svg';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import axios from '../../util/interceptor';
import { useHistory } from 'react-router';

const CreateBlog = (props) => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const history = useHistory();

    const onTitleChange = (event) => {
        setTitleError('');
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    const onPost = async () => {
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
                const response = await axios.post('/api/blog', {
                    title,
                    content,
                    tags
                })

                const blog = response.data.blog;
                history.push(`/blog/${blog._id}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Create Blog Page'});
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
        <div className='CreateBlog-Container'>
            <div className='CreateBlog-Header'>
                <div className='CreateBlog-Header-Title'>Create Blog</div>
                <DarkIconButton icon={CreateBlogIcon} alt='CreateBlog' title='Post' onClick={onPost}/>
            </div>
            <div className='CreateBlog-BlogTitle'>
                <div className='CreateBlog-BlogTitle-Title'>Title</div>
                <InputError
                    type='text'
                    placeholder='Enter Blog Title....'
                    error={titleError}
                    value={title}
                    onValueChange={onTitleChange}/>
            </div>
            <div className='CreateBlog-BlogContent'>
                <div className='CreateBlog-BlogContent-Title'>Content</div>
                <MarkdownEditor content={content} onContentChange={onContentChange} error={contentError}/>
            </div>
            <div className='CreateBlog-BlogTags'>
                <div className='CreateBlog-BlogTags-Title'>Tags</div>
                <TagInput tags={tags} setTags={setTags} placeholder='Add Tags Related to your topic, (e.g. tree, graph)'/>
            </div>
        </div>
    )
}

export default CreateBlog;