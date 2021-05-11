import React, { useEffect, useState } from 'react';
import './ProposalList.css';
import axios from '../../util/interceptor';
import ProposalTile from '../../Components/Proposal/ProposalTile/ProposalTile';
import { useHistory } from 'react-router';
import DarkLinkIconButton from '../../Components/DarkLinkIconButton/DarkLinkIconButton';
import AddIcon from '../../Icons/plus-solid.svg';

const ProposalList = (props) => {
    const [proposals, setProposals] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get('/api/proposal/user');

                setProposals(response.data.proposals);
            }
            catch(error) {
                console.log(error);
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Proposal List'});
                }
                else if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        fetchProposals();
    }, []);

    let userProposals = null;
    if(proposals) {
        userProposals = (
            <div className='ProposalList-Container'>
                <div className='ProposalList-Header'>
                    {
                        proposals.length === 0 ?
                        <div className='ProposalList-Header-Title'>No Problem Proposals Made by You Yet</div> :
                        <div className='ProposalList-Header-Title'>Problem Proposals Made by You</div>
                    }
                    <DarkLinkIconButton
                        to='/create/proposal'
                        icon={AddIcon}
                        alt='CreateProposal'
                        title='New Proposal'/>
                </div>
                <div className='ProposalList-Proposals'>
                    {
                        proposals.map(proposal => {
                            return <ProposalTile key={proposal._id} proposal={proposal}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return userProposals;
}

export default ProposalList;