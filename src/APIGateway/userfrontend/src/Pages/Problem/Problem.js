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
import MonacoEditor from '../../Components/MonacoEditor/MonacoEditor';
import ProblemDetails from '../../Components/Problem/ProblemDetails/ProblemDetails';
import { useHistory } from 'react-router';
import VerdictCard from '../../Components/VerdictCard/VerdictCard';
import LightLinkButton from '../../Components/LightLinkButton/LightLinkButton';


const Problem = (props) => {
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('Java');
    const [verdict, setVerdict] = useState(null);

    const history = useHistory();

    const onCodeChange = (value, event) => {
        setCode(value);
    }

    const onLanguageChange = (value) => {
        setLanguage(value);
    }

    const onCodeSubmit = async () => {
        try {
            const response = await axiosInterceptor.post('/api/submission', {
                problemID: problem._id,
                problemName: problem.name,
                code,
                language
            });

            setVerdict(response.data.submission.verdict);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
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

    const onCodeSampleTest = async () => {
        try {
            const response = await axiosInterceptor.post('/api/submission/sampletest', {
                problemID: problem._id,
                problemName: problem.name,
                code,
                language
            });

            setVerdict(response.data.verdict);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
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
                    <div className='Problem-Header-Problem-Title'>
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
                    <div className='Problem-Buttons-Container'>
                        <LightLinkButton path={`/submission/problem/${problem._id}`} name='View All Submissions' color='#1389f4'/>
                        <LightLinkButton path={`/editorial/problem/${problem._id}`} name='View All Editorials' color='#1389f4'/>
                    </div>
                </div>

                <ProblemDetails problem={problem}/>

                <MonacoEditor
                    code={code}
                    language={language}
                    onCodeChange={onCodeChange}
                    onLanguageChange={onLanguageChange}
                    onCodeSubmit={onCodeSubmit}
                    onCodeSampleTest={onCodeSampleTest}
                    />

                {
                    verdict &&
                    <div className='Problem-VerdictCard-Container'>
                        <div className='Problem-VerdictCard-Title'>Verdict</div>
                        <VerdictCard
                            result={verdict.result}
                            message={verdict.message}
                            time={verdict.time}
                            logs={verdict.log}/>
                    </div>
                }
            </div>
        )
    }

    return renderProblem;
}

export default Problem;