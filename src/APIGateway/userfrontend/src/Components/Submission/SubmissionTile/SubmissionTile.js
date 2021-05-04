import React from 'react';
import { Link } from 'react-router-dom';
import { getDate } from '../../../util/helper';
import './SubmissionTile.css';

const SubmissionTile = (props) => {
    const { submission } = props;

    let verdictResultStyle = {
        backgroundColor: 'rgb(235, 64, 52)'
    }

    let submissionTileStyle = {
        backgroundColor: 'rgba(235, 64, 52, 0.05)'
    }

    if(submission.verdict.result === 'Accepted') {
        verdictResultStyle.backgroundColor = 'rgb(50, 168, 78)'
        submissionTileStyle.backgroundColor = 'rgba(50, 168, 78, 0.05)';
    }

    return (
        <Link to={`/submission/${submission._id}`} className='SubmissionTile-Container' style={submissionTileStyle}>
            <Link to={`/problem/${submission.problemID}`} className='SubmissionTile-ProblemName'>
                {submission.problemName}
            </Link>
            <div className='SubmissionTile-SubmissionInfo'>
                Submitted By:
                <Link to={`/user/${submission.userID}`} className='SubmissionTile-Handle'>
                    {submission.handle}
                </Link>
                at:
                <div className='SubmissionTile-SubmissionTime'>
                    {getDate(submission.createdAt)}
                </div>
            </div>
            <div className='SubmissionTile-VerdictResult' style={verdictResultStyle}>
                {submission.verdict.result}
            </div>
        </Link>
    )
}

export default SubmissionTile;