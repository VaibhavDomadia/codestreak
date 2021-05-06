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


const Problem = (props) => {
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('Java');

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
            const response = await axios.get(`/api/problem/${problemID}`);
            const currentProblem = response.data.problem;

            setProblem(currentProblem);
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

                <div className='Problem-Field-Title'>
                    Problem Statement:
                </div>
                <div className='Problem-Field-Value'>
                    {
                        problem.statement.map((statement, index) => {
                            return <p key={index}>{statement}</p>
                        })
                    }
                </div>
                
                <div className='Problem-Field-Title'>
                    Constraints:
                </div>
                <div className='Problem-Field-Value'>
                    {
                        problem.constraints.map((constraint, index) => {
                            return <p key={index}>{constraint}</p>
                        })
                    }
                </div>

                <div className='Problem-Field-Title'>
                    Sample Cases:
                </div>
                <div className='Problem-Samplecases-Container'>
                    {
                        problem.samplecases.map((samplecase, index) => {
                            return (
                                <div key={index} className='Problem-Samplecase'>
                                    <div className='Problem-Samplecase-Box'>
                                        <div className='Problem-Samplecase-Subtitle'>
                                            Sample Input:
                                        </div>
                                        <div className='Problem-Samplecase-Innerbox'>
                                            {
                                                samplecase.input.map((input, index) => {
                                                    return <p key={index}>{input}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='Problem-Samplecase-Box'>
                                        <div className='Problem-Samplecase-Subtitle'>
                                            Sample Output:
                                        </div>
                                        <div className='Problem-Samplecase-Innerbox'>
                                            {
                                                samplecase.output.map((output, index) => {
                                                    return <p key={index}>{output}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

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