import axios from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import InputError from '../../Components/InputError/InputError';
import TextareaError from '../../Components/TextareaError/TextareaError';
import CreateIcon from '../../Icons/plus-solid.svg';
import './CreateContest.css';
import { useHistory } from 'react-router';
import SelectProposalTile from '../../Components/Proposal/SelectProposalTile/SelectProposalTile';
import Spinner from '../../Components/Spinner/Spinner';

const CreateContest = (props) => {
    const [proposals, setProposals] = useState('');
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [information, setInformation] = useState('');
    const [selectedProposals, setSelectedProposals] = useState([]);

    const [nameError, setNameError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [informationError, setInformationError] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get(`/api/proposals?status=Approved`);

                setProposals(response.data.proposals);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Create Contest'});
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

    const onNameChange = (event) => {
        setNameError('');
        setName(event.target.value);
    }

    const onStartTimeChange = (event) => {
        setStartTimeError('');
        setStartTime(event.target.value);
    }

    const onDurationChange = (event) => {
        setDurationError('');
        setDuration(event.target.value);
    }

    const onInformationChange = (event) => {
        setInformationError('');
        setInformation(event.target.value);
    }

    const onCreate = async () => {
        let isErrorPresent = false;
        if(name.trim() === '') {
            setNameError('This field is required');
            isErrorPresent = true;
        }
        if(startTime.trim() === '') {
            setStartTimeError('This field is required');
            isErrorPresent = true;
        }
        if(duration.trim() === '') {
            setDurationError('This field is required');
            isErrorPresent = true;
        }
        if(information.toString() === '') {
            setInformationError('This field is required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            try {
                const finalStartTime = new Date(startTime).getTime();
                const finalDuration = duration * 1000;
                const chosenProposals = [];
                for(const selectedProposal of selectedProposals) {
                    const findProposal = proposals.find(currentProposal => currentProposal._id === selectedProposal);

                    chosenProposals.push(findProposal);
                }

                const setters = [];
                for(const chosenProposal of chosenProposals) {
                    setters.push({
                        userID: chosenProposal.userID,
                        handle: chosenProposal.handle
                    });
                }

                let response = await axios.post(`/api/contest`, {
                    name,
                    startTime: finalStartTime,
                    duration: finalDuration,
                    information: information.split('\n'),
                    setters,
                    problemIDs: []
                });

                const contestID = response.data.contest._id;

                const problemIDs = [];
                
                for(const chosenProposal of chosenProposals) {
                    response = await axios.post('/api/problem', {
                        ...chosenProposal.problem,
                        accessTime: finalStartTime,
                        duration: finalDuration,
                        contestID
                    });

                    problemIDs.push(response.data.problem._id);
                }

                response = await axios.put(`/api/contest/${contestID}`, {
                    name,
                    startTime: finalStartTime,
                    duration: finalDuration,
                    information: information.split('\n'),
                    setters,
                    problemIDs
                });

                history.push(`/contest/${contestID}`);
            }
            catch(error) {
                console.log(error);
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Create Contest'});
                }
                else if(error.response.status === 403) {
                    history.push('/403');
                }
                else if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    history.push('/404');
                }
            }
        }
    }

    const onProposalSelect = (proposalID) => {
        const isProposalSelected = selectedProposals.find(selectedProposalID => proposalID === selectedProposalID);
        if(isProposalSelected) {
            setSelectedProposals(selectedProposals.filter(selectedProposalID => proposalID !== selectedProposalID));
        }
        else {
            setSelectedProposals([...selectedProposals, proposalID]);
        }
    }

    let renderCreateContest = <Spinner/>
    if(proposals) {
        renderCreateContest = (
            <div className='CreateContest-Container'>
                <div className='CreateContest-Header'>
                    <div className='CreateContest-Header-Title'>
                        Create Contest
                    </div>
                    <DarkIconButton
                        icon={CreateIcon}
                        alt='CreateContest'
                        title='Create'
                        onClick={onCreate}/>
                </div>
                <div className='CreateContest-Field-Container'>
                    <div className='CreateContest-Field'>
                        <div className='CreateContest-Field-Title'>
                            Contest Name:
                        </div>
                        <InputError
                            inputType='text'
                            placeholder='Enter Contest Name'
                            error={nameError}
                            value={name}
                            onValueChange={onNameChange}/>
                    </div>
                    <div className='CreateContest-Field'>
                        <div className='CreateContest-Field-Title'>
                            Start Time:
                        </div>
                        <InputError
                            inputType='datetime-local'
                            placeholder='Enter Contest Start Time'
                            error={startTimeError}
                            value={startTime}
                            onValueChange={onStartTimeChange}/>
                    </div>
                    <div className='CreateContest-Field'>
                        <div className='CreateContest-Field-Title'>
                            Duration:
                        </div>
                        <InputError
                            inputType='number'
                            placeholder='Enter Contest Duration in Seconds'
                            error={durationError}
                            value={duration}
                            onValueChange={onDurationChange}/>
                    </div>
                    <div className='CreateContest-Field'>
                        <div className='CreateContest-Field-Title'>
                            Contest Information:
                        </div>
                        <TextareaError
                            placeholder='Enter Contest Information'
                            error={informationError}
                            value={information}
                            onValueChange={onInformationChange}/>
                    </div>
                    <div className='CreateContest-Field'>
                        <div className='CreateContest-Field-Title'>
                            Problems:
                        </div>
                        <div className='CreateContest-Proposals'>
                            {
                                proposals.map(proposal => {
                                    return <SelectProposalTile proposal={proposal} onProposalSelect={onProposalSelect}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return renderCreateContest;
}

export default CreateContest;