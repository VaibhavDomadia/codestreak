import React from 'react';
import './ContestTile.css';
import { Link } from 'react-router-dom';
import { getDuration, getDateAndTime } from '../../../util/helper';
import Clock from '../../../Icons/clock-regular.svg';
import Hourglass from '../../../Icons/hourglass-start-solid.svg';

const ContestTile = (props) => {
    const contest = props.contest;

    const date = new Date(contest.startTime);

    console.log(date);

    return (
        <div className='ContestTile-Container'>
            <div className='ContestTile-Inner-Container'>
                <h3 className='ContestTile-Name'>{contest.name}</h3>
                <Link to={`/contest/${contest._id}`} className='ContestTile-Go-To-Contest-Link'>Go To Contest-&gt;</Link>
            </div>
            <div className='ContestTile-Field-Container'>
                <div className='ContestTile-Field'>
                    <img src={Hourglass} className='ContestTile-Field-Icon' alt='Hourglass'></img>
                    <div className='ContestTile-Field-Title'>Duration:</div>
                    <div className='ContestTile-Field-Value'>{getDuration(contest.duration)}</div>
                </div>
                <div className='ContestTile-Field'>
                    <img src={Clock} className='ContestTile-Field-Icon' alt='Clock'></img>
                    <div className='ContestTile-Field-Title'>Start Time:</div>    
                    <div className='ContestTile-Field-Value'>{getDateAndTime(contest.startTime)}</div>
                </div>
            </div>
            <div className='ContestTile-Collaboration-Container'>
                <div className='ContestTile-Collaboration-Title'>In Collaboration With:</div>
                <div className='ContestTile-Collaboration-Setters-Container'>
                    {
                        contest.setters.map(setter => {
                            return (
                                <div key={setter.userID} className='ContestTile-Collaboration-Setter'>
                                    <Link to={`/user/${setter._id}`} className='ContestTile-Collaboration-Setter-Link'>
                                        {setter.name}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ContestTile;