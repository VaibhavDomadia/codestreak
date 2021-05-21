import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SelectProposalTile.css';
import ClockIcon from '../../../Icons/clock-regular.svg';
import CheckIcon from '../../../Icons/check-solid.svg';
import TagCard from '../../TagCard/TagCard';
import { getDateAndTime } from '../../../util/helper';

const SelectProposalTile = (props) => {
    const { proposal, onProposalSelect } = props;
    const [select, setSelect] = useState(false);

    const onSelect = () => {
        setSelect(value => !value);
        onProposalSelect(proposal._id);
    }

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
        <div className='SelectProposalTile-Container'>
            <div className='SelectProposalTile-SelectButton' onClick={onSelect}>
                {
                    select && <img src={CheckIcon} alt='Check'/>
                }
            </div>
            <div className='SelectProposalTile'>
                <div className='SelectProposalTile-Header'>
                    <div className='SelectProposalTile-Problem-Difficulty'>{proposal.problem.difficulty}</div>
                    <div className='SelectProposalTile-Problem-Name'>{proposal.problem.name}</div>
                    <Link to={`/proposal/${proposal._id}`} className='SelectProposalTile-Go-To-Proposal-Button'>
                        Go To Proposal -&gt;
                    </Link>
                </div>
                <div className='SelectProposalTile-Tag-Container'>
                    <TagCard icon={ClockIcon} title='Submitted At' value={getDateAndTime(proposal.createdAt)}/>
                </div>
                <div className='SelectProposalTile-Status-Info'>
                    <div className='SelectProposalTile-Status'>
                        <div className='SelectProposalTile-Status-Title'>
                            Status:
                        </div>
                        <div className='SelectProposalTile-Status-Value' style={tileStyle}>
                            {proposal.status}
                        </div>
                    </div>
                    <div className='SelectProposalTile-Message'>
                        <div className='SelectProposalTile-Message-Title'>
                            Message:
                        </div>
                        <div className='SelectProposalTile-Message-Value'>
                            {proposal.message}   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectProposalTile;