import React from 'react';
import { Link } from 'react-router-dom';
import './ProposalTile.css';
import ClockIcon from '../../../Icons/clock-regular.svg';
import TagCard from '../../TagCard/TagCard';
import { getDateAndTime } from '../../../util/helper';

const ProposalTile = (props) => {
    const { proposal } = props;

    const tileStyle = {
        backgroundColor: 'rgba(66, 135, 245)'
    }

    if(proposal.status === 'Approved') {
        tileStyle.backgroundColor = 'rgba(50, 168, 82)'
    }
    else if(proposal.status === 'Rejected') {
        tileStyle.backgroundColor = 'rgba(235, 64, 52)'
    }
    else if(proposal.status === 'ChangeRequired') {
        tileStyle.backgroundColor = 'rgba(252, 186, 3)'
    }

    return (
        <div className='ProposalTile'>
            <div className='ProposalTile-Header'>
                <div className='ProposalTile-Problem-Difficulty'>{proposal.problem.difficulty}</div>
                <div className='ProposalTile-Problem-Name'>{proposal.problem.name}</div>
                <Link to={`/proposal/${proposal._id}`} className='ProposalTile-Go-To-Proposal-Button'>
                    Go To Proposal -&gt;
                </Link>
            </div>
            <div className='ProposalTile-Tag-Container'>
                <TagCard icon={ClockIcon} title='Submitted At' value={getDateAndTime(proposal.createdAt)}/>
            </div>
            <div className='ProposalTile-Status-Info'>
                <div className='ProposalTile-Status'>
                    <div className='ProposalTile-Status-Title'>
                        Status:
                    </div>
                    <div className='ProposalTile-Status-Value' style={tileStyle}>
                        {proposal.status}
                    </div>
                </div>
                <div className='ProposalTile-Message'>
                    <div className='ProposalTile-Message-Title'>
                        Message:
                    </div>
                    <div className='ProposalTile-Message-Value'>
                        {proposal.message}   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProposalTile;