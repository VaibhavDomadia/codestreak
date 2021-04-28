import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Problem.css';
import Correct from '../../Icons/check-solid.svg';
import Clock from '../../Icons/clock-regular.svg';
import Memory from '../../Icons/database-solid.svg';
import Tag from '../../Icons/tag-solid.svg';
import Code from '../../Icons/code-solid-light.svg';


const Problem = (props) => {
    const [problem, setProblem] = useState(null);

    const problemID = props.match.params.problemID;

    useEffect(() => {
        const fetchProblem = async () => {
            const response = await axios.get(`/api/problem/${problemID}`);
            const currentProblem = response.data.problem;

            setProblem(currentProblem);
        }

        fetchProblem();
    }, []);

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
                    <div className='Problem-Tab'>
                        <img src={Correct} className='Problem-Tab-Icon' alt='Correct'></img>
                        <div className='Problem-Tab-Title'>
                            Solved By:
                        </div>
                        <div className='Problem-Tab-Value'>
                            {problem.solvedBy}
                        </div>
                    </div>

                    <div className='Problem-Tab'>
                        <img src={Code} className='Problem-Tab-Icon' alt='Code'></img>
                        <div className='Problem-Tab-Title'>
                            Submissions:
                        </div>
                        <div className='Problem-Tab-Value'>
                            {problem.numberOfSubmission}
                        </div>
                    </div>

                    <div className='Problem-Tab'>
                        <img src={Clock} className='Problem-Tab-Icon' alt='Clock'></img>
                        <div className='Problem-Tab-Title'>
                            Time Limit:
                        </div>
                        <div className='Problem-Tab-Value'>
                            {`${parseInt(problem.timeLimit)/1000} s`}
                        </div>
                    </div>

                    <div className='Problem-Tab'>
                        <img src={Memory} className='Problem-Tab-Icon' alt='Memory'></img>
                        <div className='Problem-Tab-Title'>
                            Memory Limit:
                        </div>
                        <div className='Problem-Tab-Value'>
                            {`${problem.memory} MB`}
                        </div>
                    </div>

                    <div className='Problem-Tab'>
                        <img src={Tag} className='Problem-Tab-Icon' alt='Tag'></img>
                        <div className='Problem-Tab-Title'>
                            Tags:
                        </div>
                        <div className='Problem-Tab-Value'>
                            {problem.tags.join(', ')}
                        </div>
                    </div>
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
            </div>
        )
    }

    return renderProblem;
}

export default Problem;