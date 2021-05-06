import React from 'react';
import './ProblemDetails.css';

const ProblemDetails = (props) => {
    const { problem } = props;

    return (
        <div className='ProblemDetails-Container'>
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

export default ProblemDetails;