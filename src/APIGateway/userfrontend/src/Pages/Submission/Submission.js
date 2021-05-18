import axios from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getDateAndTime } from '../../util/helper';
import './Submission.css';
import CodeEditor from '@monaco-editor/react';
import VerdictCard from '../../Components/VerdictCard/VerdictCard';
import Spinner from '../../Components/Spinner/Spinner';

const Submission = (props) => {
    const [submission, setSubmission] = useState(null);

    const submissionID = props.match.params.submissionID;

    const history = useHistory();

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await axios.get(`/api/submission/${submissionID}`);

                setSubmission(response.data.submission);
            }
            catch(error) {
                if(error.response.status === 403) {
                    history.replace('/403');
                }
                else if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        fetchSubmission();
    }, [submissionID]);

    console.log(submission);

    let renderSubmission = <Spinner/>;
    if(submission) {
        renderSubmission = (
            <div className='Submission-Container'>
                <div className='Submission-Header-Title'>
                    Submission Made For
                    <Link to={`/problem/${submission.problemID}`} className='Submission-Header-Problem-Name'>
                        {submission.problemName}
                    </Link>
                </div>
                <div className='Submission-Verdict-Container'>
                    <div className='Submission-Verdict-Title'>Verdict:</div>
                    <VerdictCard
                        result={submission.verdict.result}
                        message={submission.verdict.message}
                        time={submission.verdict.time}
                        logs={submission.verdict.log}/>
                </div>
                <div className='Submission-Code-Container'>
                    <div className='Submission-Code-Header'>Code:</div>
                    <div className='Submission-Code-Stats'>
                        <div>Language: {submission.language}</div>
                        <div>Submitted At: {getDateAndTime(submission.createdAt)}</div>
                    </div>
                    <div className='Submission-Code'>
                        <CodeEditor
                            value={submission.code}
                            language={submission.language.toLowerCase()}
                            theme='vs-dark'
                            height='500px'/>
                    </div>
                </div>
            </div>
        )
    }

    return renderSubmission;
}

export default Submission;