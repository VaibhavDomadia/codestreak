import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ProblemSubmissions.css';
import SubmissionTile from '../../Components/Submission/SubmissionTile/SubmissionTile';
import { useHistory } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';

const ProblemSubmissions = (props) => {
    const [submissions, setSubmissions] = useState(null);
    const history = useHistory();

    const problemID = props.match.params.problemID;

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`api/submission/problem/${problemID}`);
    
                setSubmissions(response.data.submissions);
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

        fetchSubmissions();
    }, [problemID]);

    let renderSubmissions = <Spinner/>;
    if(submissions) {
        renderSubmissions = (
            <div className='ProblemSubmissionsPage-Container'>
                <div className='ProblemSubmissionsPage-Header'>
                    All Submissions
                </div>
                <div className='ProblemSubmissionsPage-Submission-Container'>
                    {
                        submissions.length === 0 ?
                        <div className='ProblemSubmissionsPage-NoSubmissionYet'>
                            No Submissions Made Yet
                        </div> :
                        submissions.map(submission => {
                            return <SubmissionTile key={submission._id} submission={submission}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return renderSubmissions;
}

export default ProblemSubmissions;