import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubmissionTile from '../../Components/Submission/SubmissionTile/SubmissionTile';
import './UserSubmissions.css';

const UserSubmissions = (props) => {
    const userID = props.match.params.userID;
    const [submissions, setSubmissions] = useState(null);

    useEffect(() => {
        const fetchUserSubmissions = async () => {
            const response = await axios.get(`/api/submission/user/${userID}`);

            setSubmissions(response.data.submissions);
        }

        fetchUserSubmissions();
    }, [userID]);

    console.log(submissions);

    let userSubmission = null;
    if(submissions) {
        userSubmission = (
            <div className='UserSubmissions-Container'>
                <div className='UserSubmissions-Header'>
                    All Submissions
                </div>
                {
                    submissions.length === 0 ?
                    <div className='UserSubmissions-NoSubmissionsYetBanner'>
                        No Submission Made By The User Yet
                    </div> :
                    <div className='UserSubmissions-SubmissionContainer'>
                        {
                            submissions.map(submission => {
                                return <SubmissionTile key={submission._id} submission={submission}/>
                            })
                        }
                    </div>
                }
                
            </div>    
        )
    }

    return userSubmission;
}

export default UserSubmissions;