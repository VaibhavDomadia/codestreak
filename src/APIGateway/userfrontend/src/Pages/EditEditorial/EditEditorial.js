import React, { useEffect, useState } from 'react';
import InputError from '../../Components/InputError/InputError';
import MarkdownEditor from '../../Components/MarkdownEditor/MarkdownEditor';
import TagInput from '../../Components/TagInput/TagInput';
import './EditEditorial.css';
import EditEditorialIcon from '../../Icons/pen-solid.svg';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import { useHistory } from 'react-router';

const EditEditorial = (props) => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const history = useHistory();

    const editorialID = props.match.params.editorialID;

    const onTitleChange = (event) => {
        setTitleError('');
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    useEffect(() => {
        const fetchEditorial = async () => {
            try {
                const response = await axios.get(`/api/editorial/${editorialID}`);

                const { tags, title, content } = response.data.editorial;

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

        fetchEditorial();
    }, [editorialID]);

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
                const response = await axiosInterceptor.put(`/api/editorial/${editorialID}`, {
                    title,
                    content,
                    tags
                })

                history.push(`/editorial/${editorialID}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Editorial Page'});
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
        <div className='EditEditorial-Container'>
            <div className='EditEditorial-Header'>
                <div className='EditEditorial-Header-Title'>Edit Editorial</div>
                <DarkIconButton icon={EditEditorialIcon} alt='EditEditorial' title='Edit' onClick={onEdit}/>
            </div>
            <div className='EditEditorial-EditorialTitle'>
                <div className='EditEditorial-EditorialTitle-Title'>Title</div>
                <InputError
                    type='text'
                    placeholder='Enter Editorial Title....'
                    error={titleError}
                    value={title}
                    onValueChange={onTitleChange}/>
            </div>
            <div className='EditEditorial-EditorialContent'>
                <div className='EditEditorial-EditorialContent-Title'>Content</div>
                <MarkdownEditor content={content} onContentChange={onContentChange} error={contentError}/>
            </div>
            <div className='EditEditorial-EditorialTags'>
                <div className='EditEditorial-EditorialTags-Title'>Tags</div>
                <TagInput tags={tags} setTags={setTags} placeholder='Add Tags Related to your topic, (e.g. tree, graph)'/>
            </div>
        </div>
    )
}

export default EditEditorial;