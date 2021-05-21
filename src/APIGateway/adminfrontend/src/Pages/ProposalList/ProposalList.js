import React, { useEffect, useState } from 'react';
import './ProposalList.css';
import axios from '../../util/interceptor';
import ProposalTile from '../../Components/Proposal/ProposalTile/ProposalTile';
import { useHistory } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';
import Select from '../../Components/Select/Select';

const ProposalList = (props) => {
    const [proposals, setProposals] = useState();
    const [status, setStatus] = useState('All');
    const history = useHistory();

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get(`/api/proposals?status=${status}`);

                setProposals(response.data.proposals);
            }
            catch(error) {
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
    }, [status]);

    let userProposals = <Spinner/>;
    if(proposals) {
        userProposals = (
            <div className='ProposalList-Container'>
                <div className='ProposalList-Header'>
                    {
                        proposals.length === 0 ?
                        <div className='ProposalList-Header-Title'>No Problem Proposals</div> :
                        <div className='ProposalList-Header-Title'>Problem Proposals</div>
                    }
                    <Select
                        value={status}
                        setValue={setStatus}
                        options={['All', 'Approved', 'Pending', 'Rejected', 'Change Required']}/>
                </div>
                <div className='ProposalList-Proposals'>
                    {
                        proposals.length === 0 &&
                        <div className='ProposalList-NoProposals'>No Proposals Found</div>
                    }
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