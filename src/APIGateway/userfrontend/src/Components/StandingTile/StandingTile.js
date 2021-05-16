import React from 'react';
import { Link } from 'react-router-dom';
import { getDuration } from '../../util/helper';
import ProfileImage from '../ProfileImage/ProfileImage';
import './StandingTile.css';

const StandingTile = (props) => {
    const { rank, user } = props;
    return (
        <div className='StandingTile'>
            <div className='StandingTile-Rank'>{rank}</div>
            <div className='StandingTile-UserInfo'>
                <ProfileImage link={`/images/${user.userID}`} size={32}/>
                <Link to={`/user/${user.userID}`} className='StandingTile-Handle'>{user.handle}</Link>
            </div>
            <div className='StandingTile-Field'>
                <div className='StandingTile-Field-Title'>
                    Problem Solved:
                </div>
                <div className='StandingTile-Field-Value'>
                    {user.problemSolved.length}
                </div>
            </div>
            <div className='StandingTile-Field'>
                <div className='StandingTile-Field-Title'>
                    Time Taken:
                </div>
                <div className='StandingTile-Field-Value'>
                    {getDuration(user.timeTaken)}
                </div>
            </div>
        </div>
    )
}

export default StandingTile;