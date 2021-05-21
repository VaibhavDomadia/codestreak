import React, { useEffect, useState } from 'react';
import { getTimeBeforeContest, getTimeLeftForContestToEnd } from '../../../util/helper';
import './ContestTimeBanner.css';

const ContestTimeBanner = (props) => {
    const { startTime, duration } = props;
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(time => time + 1000);
        }, 1000);

        return () => clearInterval(timer);
    })

    const getDisplayValue = (time) => {
        if(time < startTime) {
            return `The Contest will start in ${getTimeBeforeContest(startTime-time)}`;
        }
        else if(time < startTime + duration) {
            return `The Contest will end in ${getTimeLeftForContestToEnd(startTime+duration-time)}`;
        }
        else {
            return `The Contest has ended`;
        }
    }

    return (
        <div className='ContestTimeBanner'>
            {getDisplayValue(currentTime)}
        </div>
    )
}

export default ContestTimeBanner;