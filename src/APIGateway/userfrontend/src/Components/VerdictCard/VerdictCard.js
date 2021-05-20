import React from 'react';
import './VerdictCard.css';

import TimeOutIcon from '../../Icons/times-circle-solid-yellow.svg';
import FailedIcon from '../../Icons/times-circle-solid.svg';
import AcceptedIcon from '../../Icons/check-circle-solid.svg';

const VerdictCard = (props) => {
    const { result, message, time, logs } = props;

    let verdictCardStyle = {};
    let resultStyle={};
    let icon = null;

    if(result === 'Accepted') {
        verdictCardStyle.borderLeft = `4px solid rgb(50, 168, 82)`;
        verdictCardStyle.backgroundColor = 'rgba(50, 168, 82, 0.1)';
        resultStyle.color = 'rgb(50, 168, 82)';
        icon = AcceptedIcon
    }
    else {
        if(message === 'Time Limit Exceded') {
            verdictCardStyle.borderLeft = `4px solid rgb(252, 186, 3)`;
            verdictCardStyle.backgroundColor = 'rgba(252, 186, 3, 0.1)';
            resultStyle.color = 'rgb(252, 186, 3)';
            icon = TimeOutIcon;
        }
        else {
            verdictCardStyle.borderLeft = `4px solid rgb(235, 64, 52)`;
            verdictCardStyle.backgroundColor = 'rgba(235, 64, 52, 0.1)';
            resultStyle.color = 'rgb(235, 64, 52)';
            icon = FailedIcon;
        }
    }

    return (
        <div className='VerdictCard' style={verdictCardStyle}>
            <div className='VerdictCard-Result' style={resultStyle}>
                <img src={icon} alt={result} className='VerdictCard-Result-Icon'></img>
                {result}
            </div>
            <div className='VerdictCard-Message'>
                {message}
            </div>
            <div className='VerdictCard-Time'>
                Execution Time: {time} ms
            </div>
            <div className='VerdictCard-Logs'>
                {
                    logs.map((log, index) => {
                        return <p key={index}>{log}</p>
                    })
                }
            </div>
        </div>
    )
}

export default VerdictCard;