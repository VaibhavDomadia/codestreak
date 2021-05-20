import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TagCard from '../../Components/TagCard/TagCard';
import './Contest.css';

import Clock from '../../Icons/clock-regular.svg';
import Hourglass from '../../Icons/hourglass-start-solid.svg';
import RegisterIcon from '../../Icons/registered-solid.svg';
import StarIcon from '../../Icons/star-regular.svg';

import { getDateAndTime, getDuration } from '../../util/helper';
import ContestTimeBanner from '../../Components/Contest/ContestTimeBanner/ContestTimeBanner';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { getUserID } from '../../util/authentication';
import ProblemTile from '../../Components/Problem/ProblemTile/ProblemTile';
import LinkButton from '../../Components/LinkButton/LinkButton';
import Spinner from '../../Components/Spinner/Spinner';

const Contest = (props) => {
    const [contest, setContest] = useState(null);
    const history = useHistory();

    const contestID = props.match.params.contestID;

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await axios(`/api/contest/${contestID}`);

                setContest(response.data.contest);
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

        fetchContest();
    }, [contestID]);

    const onRegister = async () => {
        try {
            const response = await axiosInterceptor.post(`/api/contest/${contestID}/register`);

            setContest(response.data.contest);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Contest Page'});
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

    const onUnregister = async () => {
        try {
            const response = await axiosInterceptor.post(`/api/contest/${contestID}/unregister`);

            setContest(response.data.contest);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Contest Page'});
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

    let renderContest = <Spinner/>;
    if(contest) {
        const userID = getUserID(localStorage.getItem('token'));
        const isUserRegistered = contest.registeredParticipants.find(user => user.userID === userID);
        const isContestStartedOrEnded = new Date().getTime() >= new Date(contest.startTime).getTime();

        renderContest = (
            <div className='ContestPage-Container'>
                <div className='ContestPage-Header'>
                    <div className='ContestPage-Header-Main'>
                        <div className='ContestPage-Header-ContestName'>{contest.name}</div>
                        {
                            isContestStartedOrEnded ? 
                                <LinkButton name='Standings' color='#1389f4' path={`/contest/${contestID}/standings`}/> :
                                isUserRegistered ?
                                    <Button name='Unregister' color='#eb4034' onClick={onUnregister}/> :
                                    <Button name='Register' color='#1389fd' onClick={onRegister}/>
                        }
                    </div>
                    <div className='ContestPage-Header-Tag-Container'>
                        <TagCard icon={Hourglass} title='Duration' value={getDuration(contest.duration)}/>
                        <TagCard icon={Clock} title='Start Time' value={getDateAndTime(contest.startTime)}/>
                        <TagCard icon={RegisterIcon} title='Registered Participants' value={contest.numberOfRegisteredParticipants}/>
                    </div>
                    <div className='ContestPage-Header-ProblemSetters-Container'>
                        <div className='ContestPage-Header-ProblemSetters-Title'>Problem Setters:</div>
                        <div className='ContestPage-Header-ProblemSetters'>
                            {
                                contest.setters.map(setter => {
                                    return <Link key={setter._id} to={`/user/${setter.userID}`} className='ContestPage-Header-ProblemSetter'>{setter.handle}</Link>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='ContestPage-Info-Container'>
                    <ContestTimeBanner 
                        startTime={new Date(contest.startTime).getTime()}
                        duration={contest.duration}/>
                    <div className='ContestPage-Contest-Information'>
                        <div className='ContestPage-Contest-Information-Title'>Information:</div>
                        {
                            contest.information.map((info, index) => {
                                return <p key={index}>{info}</p>
                            })
                        }
                    </div>
                    <div className='ContestPage-ImportantNote'>
                        <div className='ContestPage-ImportantNote-Title'>
                            <img src={StarIcon} alt='Star' className='ContestPage-ImportantNote-Title-Icon'></img>
                            Important Note
                        </div>
                        <ul>
                            <li>To provide a better contest and ensure fairness, we listened to Codestreakers' feedback and put in lots of thoughts behind the updated contest rule. Please check out our new contest rule which covers more scenarios with details explained.</li>
                            <li>The penalty time of 5 minutes will be applied for each wrong submission.</li>
                            <li>To ensure the fairness of the contest, Codestreak will hide some test cases during the contest. When users submit incorrect submissions, Codestreak will not show the hidden test cases to the users.</li>
                            <li>The final rating of this contest will be updated within 5 working days after the contest.</li>
                        </ul>
                    </div>
                </div>

                <div className='ContestPage-Problems-Container'>
                    <div className='ContestPage-Problems-Title'>Problems</div>
                    {
                        isContestStartedOrEnded ?
                        contest.problems.map(problem => {
                            return <ProblemTile key={problem._id} problem={problem}/>
                        }) :
                        <div className='ContestPage-Problem-Not-Visible'>
                            Problems will be visible when contest starts
                        </div>
                    }
                </div>
            </div>
        )
    }

    return renderContest;
}

export default Contest;
