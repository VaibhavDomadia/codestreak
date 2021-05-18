import React, { useEffect, useState } from 'react';
import InputError from '../../Components/InputError/InputError';
import MarkdownEditor from '../../Components/MarkdownEditor/MarkdownEditor';
import TagInput from '../../Components/TagInput/TagInput';
import './CreateEditorial.css';
import CreateEditorialIcon from '../../Icons/paper-plane-solid.svg';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import axios from '../../util/interceptor';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';

const CreateEditorial = (props) => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [problem, setProblem] = useState(null);
    const history = useHistory();

    const problemID = props.match.params.problemID;

    const onTitleChange = (event) => {
        setTitleError('');
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContentError('');
        setContent(event.target.value);
    }

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/api/problem/${problemID}`);

                setProblem(response.data.problem);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.replace('/500');
                }
                else if(error.response.status === 403) {
                    history.replace('/403');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        fetchProblem();
    }, [problemID]);

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
                const response = await axios.post('/api/editorial', {
                    problemID: problem._id,
                    problemName: problem.name,
                    title,
                    content,
                    tags
                })

                const editorial = response.data.editorial;
                history.push(`/editorial/${editorial._id}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Create Editorial Page'});
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

    let renderCreateEditorialPage = <Spinner/>;
    if(problem) {
        renderCreateEditorialPage = (
            <div className='CreateEditorial-Container'>
                <div className='CreateEditorial-Header'>
                    <div className='CreateEditorial-Header-Title'>
                        Create Editorial for <Link to={`/problem/${problem._id}`} className='CreateEditorial-Header-Title-ProblemLink'>{problem.name}</Link>
                    </div>
                    <DarkIconButton icon={CreateEditorialIcon} alt='CreateEditorial' title='Post' onClick={onPost}/>
                </div>
                <div className='CreateEditorial-EditorialTitle'>
                    <div className='CreateEditorial-EditorialTitle-Title'>Title</div>
                    <InputError
                        type='text'
                        placeholder='Enter Editorial Title....'
                        error={titleError}
                        value={title}
                        onValueChange={onTitleChange}/>
                </div>
                <div className='CreateEditorial-EditorialContent'>
                    <div className='CreateEditorial-EditorialContent-Title'>Content</div>
                    <MarkdownEditor content={content} onContentChange={onContentChange} error={contentError}/>
                </div>
                <div className='CreateEditorial-EditorialTags'>
                    <div className='CreateEditorial-EditorialTags-Title'>Tags</div>
                    <TagInput tags={tags} setTags={setTags} placeholder='Add Tags Related to your topic, (e.g. tree, graph)'/>
                </div>
            </div>
        )
    }

    return renderCreateEditorialPage;
}

export default CreateEditorial;