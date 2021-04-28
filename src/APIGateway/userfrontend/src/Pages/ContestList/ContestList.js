import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestTile from '../../Components/Contest/ContestTile/ContestTile';
import './ContestList.css';

const ContestList = (props) => {
    const [contests, setContests] = useState([]);

    useEffect(async () => {
        const response = await axios.get('/api/contests');
        const contests = response.data.contests;

        setContests(contests);
    }, []);

    const upcomingContests = [];
    const ongoingContests = [];
    const pastContests = [];

    for(const contest of contests) {
        const startTime = new Date(contest.startTime).getTime();
        const endTime = startTime + parseInt(contest.duration);
        const currentTime = new Date().getTime();
        if(currentTime >= endTime) {
            pastContests.push(<ContestTile key={contest._id} contest={contest}/>);
        }
        else if(currentTime > startTime && currentTime < endTime) {
            ongoingContests.push(<ContestTile key={contest._id} contest={contest}/>);
        }
        else {
            upcomingContests.push(<ContestTile key={contest._id} contest={contest}/>);
        }
    }

    console.log(contests);

    return (
        <div className='ContestList'>
            {
                ongoingContests.length != 0 &&
                <div className='ContestGroup-Container'>
                    <div className='ContestGroup-Title'>
                        Ongoing Contest
                    </div>
                    {ongoingContests}
                </div>
            }
            {
                upcomingContests.length != 0 &&
                <div className='ContestGroup-Container'>
                    <div className='ContestGroup-Title'>
                        Upcoming Contest
                    </div>
                    {upcomingContests}
                </div>
            }
            {
                pastContests.length != 0 &&
                <div className='ContestGroup-Container'>
                    <div className='ContestGroup-Title'>
                        Past Contest
                    </div>
                    {pastContests}
                </div>  
            } 
        </div>
    )
}

export default ContestList;