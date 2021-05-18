import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';
import SubmissionTile from '../../Components/Submission/SubmissionTile/SubmissionTile';
import './UserSubmissions.css';

const UserSubmissions = (props) => {
    const userID = props.match.params.userID;
    const [submissions, setSubmissions] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchUserSubmissions = async () => {
            try {
                const response = await axios.get(`/api/submission/user/${userID}`);

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

        fetchUserSubmissions();
    }, [userID]);

    console.log(submissions);

    let userSubmission = <Spinner/>;
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