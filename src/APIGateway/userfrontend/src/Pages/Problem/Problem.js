import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Problem.css';
import Correct from '../../Icons/check-solid.svg';
import Clock from '../../Icons/clock-regular.svg';
import Memory from '../../Icons/database-solid.svg';
import Tag from '../../Icons/tag-solid.svg';
import Code from '../../Icons/code-solid-light.svg';
import TagCard from '../../Components/TagCard/TagCard';
import MonacoEditor from '../../Components/MonacoEditor/MonacoEditor';
import ProblemDetails from '../../Components/Problem/ProblemDetails/ProblemDetails';
import { useHistory } from 'react-router';


const Problem = (props) => {
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('Java');

    const history = useHistory();

    const onCodeChange = (value, event) => {
        setCode(value);
    }

    const onLanguageChange = (value) => {
        setLanguage(value);
    }

    const onCodeSubmit = () => {
        console.log('Code Submitted');
    }

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
                else {
                    history.replace('/404');
                }
            }
        }

        fetchProblem();
    }, [problemID]);

    let renderProblem = null;
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
                    <div className='Problem-Difficulty' style={{backgroundColor: difficultyColor}}>
                        {problem.difficulty}
                    </div>
                    <h3 className='Problem-Name'>{problem.name}</h3>
                </div>

                <div className='Problem-Tab-Container'>
                    <TagCard icon={Correct} alt='Correct' title='Solved By' value={problem.solvedBy}/>
                    <TagCard icon={Code} alt='Code' title='Submissions' value={problem.numberOfSubmission}/>
                    <TagCard icon={Clock} alt='Clock' title='Time Limit' value={`${parseInt(problem.timeLimit)/1000} s`}/>
                    <TagCard icon={Memory} alt='Memory' title='Memory Limit' value={`${problem.memory} MB`}/>
                    <TagCard icon={Tag} alt='Tag' title='Tags' value={problem.tags.join(', ')}/>
                </div>

                <div className='Problem-Seperator'></div>

                <ProblemDetails problem={problem}/>

                <MonacoEditor
                    code={code}
                    language={language}
                    onCodeChange={onCodeChange}
                    onLanguageChange={onLanguageChange}
                    onCodeSubmit={onCodeSubmit}
                    />
            </div>
        )
    }

    return renderProblem;
}

export default Problem;