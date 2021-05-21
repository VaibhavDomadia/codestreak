import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import React, { useState, useEffect } from 'react';
import './Problem.css';
import Correct from '../../Icons/check-solid.svg';
import Clock from '../../Icons/clock-regular.svg';
import Memory from '../../Icons/database-solid.svg';
import Tag from '../../Icons/tag-solid.svg';
import Code from '../../Icons/code-solid-light.svg';
import TagCard from '../../Components/TagCard/TagCard';
import ProblemDetails from '../../Components/Problem/ProblemDetails/ProblemDetails';
import { useHistory } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';
import DarkSmallLinkIconButton from '../../Components/DarkSmallLinkIconButton/DarkSmallLinkIconButton';
import DeleteIcon from '../../Icons/trash-solid.svg';
import EditIcon from '../../Icons/pen-solid.svg';
import DarkSmallIconButton from '../../Components/DarkSmallIconButton/DarkSmallIconButton';


const Problem = (props) => {
    const [problem, setProblem] = useState(null);

    const history = useHistory();

    
    const problemID = props.match.params.problemID;

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/api/problem/${problemID}`);
                const currentProblem = response.data.problem;

                setProblem(currentProblem);
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

    const onProblemDelete = async () => {
        try {
            const response = await axiosInterceptor.delete(`/api/problem/${problemID}`);

            history.replace('/problem');
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Problem Page'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    let renderProblem = <Spinner/>;
    if(problem) {
        let difficultyColor = '#32a852';
        if(problem.difficulty === 'Medium') {
            difficultyColor = '#fcba03';
        }
        else if(problem.difficulty === 'Hard') {
            difficultyColor = '#eb4034';
        }

        renderProblem = (
            <div className='Problem-Container'>
                <div className='Problem-Header-Container'>
                    <div className='Problem-Header-Problem-Title'>
                        <div className='Problem-Difficulty' style={{backgroundColor: difficultyColor}}>
                            {problem.difficulty}
                        </div>
                        <h3 className='Problem-Name'>{problem.name}</h3>
                        <div className='Problem-Header-Problem-Buttons'>
                            <DarkSmallLinkIconButton to={`/edit/problem/${problemID}`} alt='Edit' icon={EditIcon} title='Edit Problem'/>
                            <DarkSmallIconButton icon={DeleteIcon} alt='Delete' title='Delete Problem' onClick={onProblemDelete}/>
                        </div>
                    </div>
                    <div className='Problem-Tab-Container'>
                        <TagCard icon={Correct} alt='Correct' title='Solved By' value={problem.solvedBy}/>
                        <TagCard icon={Code} alt='Code' title='Submissions' value={problem.numberOfSubmission}/>
                        <TagCard icon={Clock} alt='Clock' title='Time Limit' value={`${parseInt(problem.timeLimit)/1000} s`}/>
                        <TagCard icon={Memory} alt='Memory' title='Memory Limit' value={`${problem.memory} MB`}/>
                        <TagCard icon={Tag} alt='Tag' title='Tags' value={problem.tags.join(', ')}/>
                    </div>                    
                </div>

                <ProblemDetails problem={problem}/>
            </div>
        )
    }

    return renderProblem;
}

export default Problem;