import axios from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import './Proposal.css';
import { useHistory } from 'react-router';
import DifficultyTag from '../../Components/DifficultyTag/DifficultyTag';
import TagCard from '../../Components/TagCard/TagCard';
import { getDateAndTime } from '../../util/helper';
import ProblemDetails from '../../Components/Problem/ProblemDetails/ProblemDetails';

import ClockIcon from '../../Icons/clock-regular.svg';
import StatusIcon from '../../Icons/hashtag-solid.svg';
import ChatSection from '../../Components/ChatSection/ChatSection';

const Proposal = (props) => {
    const [proposal, setProposal] = useState(null);
    const history = useHistory();

    const proposalID = props.match.params.proposalID;

    const onMessage = async (value) => {
        try {
            const response = await axios.post(`/api/proposal/${proposalID}/chat`, {message: value});

            setProposal(response.data.proposal);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
            }
            else if(error.response.status === 403) {
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

    const onMessageDelete = async (messageID) => {
        try {
            const response = await axios.delete(`/api/proposal/${proposalID}/chat/${messageID}`);

            setProposal(response.data.proposal);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
            }
            else if(error.response.status === 403) {
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

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await axios.get(`/api/proposal/${proposalID}`);

                setProposal(response.data.proposal);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Proposal List'});
                }
                else if(error.response.status === 403) {
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

        fetchProposal();
    }, [proposalID]);

    let renderProposal = null;
    if(proposal) {
        renderProposal = (
            <div className='Proposal'>
                <div className='Proposal-Header'>
                    <DifficultyTag difficulty='Easy'/>
                    <div className='Proposal-Header-Title'>{proposal.problem.name}</div>
                </div>
                <div className='Proposal-Tag-Container'>
                    <TagCard icon={ClockIcon} title='Submitted At' value={getDateAndTime(proposal.createdAt)}/>
                    <TagCard icon={StatusIcon} title='Status' value={proposal.status}/>
                </div>
                <div className='Proposal-Message-Container'>
                    <div className='Proposal-Message'>{proposal.message}</div>
                </div>
                <div className='Proposal-ProblemDetails'>
                    <ProblemDetails problem={proposal.problem}/>
                </div>
                <div className='Proposal-Chat-Container'>
                    <ChatSection chats={proposal.chat} onMessage={onMessage} onMessageDelete={onMessageDelete}/>
                </div>
            </div>
        )
    }

    return renderProposal;
}

export default Proposal;