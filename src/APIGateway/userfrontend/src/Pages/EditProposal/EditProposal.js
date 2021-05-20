import axios from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import InputError from '../../Components/InputError/InputError';
import Select from '../../Components/Select/Select';
import TagInput from '../../Components/TagInput/TagInput';
import TextareaError from '../../Components/TextareaError/TextareaError';
import EditIcon from '../../Icons/pen-solid.svg';
import AddIcon from '../../Icons/plus-solid.svg';
import './EditProposal.css';
import { useHistory } from 'react-router';

const EditProposal = (props) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [statement, setStatement] = useState('');
    const [samplecases, setSamplecases] = useState([{input: '', output: ''}]);
    const [hiddencases, setHiddencases] = useState([{input: '', output: ''}]);
    const [constraints, setConstraints] = useState('');
    const [timeLimit, setTimeLimit] = useState(1000);
    const [memoryLimit, setMemoryLimit] = useState(256);
    const [tags, setTags] = useState([]);

    const [nameError, setNameError] = useState('');
    const [statementError, setStatementError] = useState('');
    const [constraintsError, setConstraintsError] = useState('');
    const [timeLimitError, setTimeLimitError] = useState('');
    const [memoryLimitError, setMemoryLimitError] = useState('');

    const history = useHistory();

    const proposalID = props.match.params.proposalID;

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await axios.get(`/api/proposal/${proposalID}`);

                const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memory, tags } = response.data.proposal.problem;

                const stateStatement = statement.join('\n');
                const stateSamplecases = samplecases.map(samplecase => {
                    return {
                        input: samplecase.input.join('\n'),
                        output: samplecase.output.join('\n')
                    }
                });
                const stateHiddencases = hiddencases.map(hiddencase => {
                    return {
                        input: hiddencase.input.join('\n'),
                        output: hiddencase.output.join('\n')
                    }
                });
                const stateConstraints = constraints.join('\n');

                setName(name);
                setDifficulty(difficulty)
                setStatement(stateStatement)
                setSamplecases(stateSamplecases);
                setHiddencases(stateHiddencases);
                setConstraints(stateConstraints);
                setTimeLimit(timeLimit);
                setMemoryLimit(memory);
                setTags(tags);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Proposal'});
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

    const onNameChange = (event) => {
        setNameError('');
        setName(event.target.value);
    }

    const onDifficultyChange = (value) => {
        setDifficulty(value);
    }

    const onStatementChange = (event) => {
        setStatementError('');
        setStatement(event.target.value);
    }

    const onConstraintsChange = (event) => {
        setConstraintsError('');
        setConstraints(event.target.value);
    }

    const onTimeLimitChange = (event) => {
        setTimeLimitError('');
        setTimeLimit(event.target.value);
    }
    
    const onMemoryLimitChange = (event) => {
        setMemoryLimitError('');
        setMemoryLimit(event.target.value);
    }

    const onAddSampleCase = () => {
        setSamplecases([...samplecases, {input: '', output: ''}]);
    }

    const onSampleCaseChange = (index, type, event) => {
        const changedSampleCase = JSON.parse(JSON.stringify(samplecases));
        changedSampleCase[index][type] = event.target.value;
        setSamplecases(changedSampleCase);
    }

    const onAddHiddenCase = () => {
        setHiddencases([...hiddencases, {input: '', output: ''}]);
    }

    const onHiddenCaseChange = (index, type, event) => {
        const changedHiddenCase = JSON.parse(JSON.stringify(hiddencases));
        changedHiddenCase[index][type] = event.target.value;
        setHiddencases(changedHiddenCase);
    }

    const onEdit = async () => {
        let isErrorPresent = false;
        if(name.trim() === '') {
            setNameError('This field is required');
            isErrorPresent = true;
        }
        if(statement.trim() === '') {
            setStatementError('This field is required');
            isErrorPresent = true;
        }
        if(constraints.trim() === '') {
            setConstraintsError('This field is required');
            isErrorPresent = true;
        }
        if(timeLimit.toString() === '') {
            setTimeLimitError('This field is required');
            isErrorPresent = true;
        }
        if(memoryLimit.toString() === '') {
            setMemoryLimitError('This field is required');
            isErrorPresent = true;
        }
        if(!isErrorPresent) {
            const problem = {
                name,
                difficulty,
                statement: statement.split('\n'),
                constraints: constraints.split('\n'),
                samplecases: samplecases.map(samplecase => {
                    return {
                        input: samplecase.input.split('\n'),
                        output: samplecase.output.split('\n')
                    }
                }),
                hiddencases: hiddencases.map(hiddencase => {
                    return {
                        input: hiddencase.input.split('\n'),
                        output: hiddencase.output.split('\n')
                    }
                }),
                timeLimit,
                memory: memoryLimit,
                tags
            }

            try {
                const response = await axios.put(`/api/proposal/${proposalID}`, { problem });

                history.push(`/proposal/${proposalID}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Proposal'});
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

    return (
        <div className='EditProposal-Container'>
            <div className='EditProposal-Header'>
                <div className='EditProposal-Header-Title'>
                    Edit Proposal
                </div>
                <DarkIconButton
                    icon={EditIcon}
                    alt='EditProposal'
                    title='Edit'
                    onClick={onEdit}/>
            </div>
            <div className='EditProposal-Field-Container'>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Problem Name:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Problem Name'
                        error={nameError}
                        value={name}
                        onValueChange={onNameChange}/>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Difficulty:
                    </div>
                    <div className='EditProposal-Difficulty-Select'>
                        <Select
                            value={difficulty}
                            setValue={onDifficultyChange}
                            options={['Easy', 'Medium', 'Hard']}/>
                    </div>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Problem Statement:
                    </div>
                    <TextareaError
                        placeholder='Enter Problem Statement'
                        error={statementError}
                        value={statement}
                        onValueChange={onStatementChange}/>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Sample Cases:
                    </div>
                    {
                        samplecases.map((samplecase, index) => {
                            return (
                                <div key={index} className='EditProposal-Case-Container'>
                                    <div className='EditProposal-Case-Title'>Sample Input:</div>
                                    <TextareaError
                                        placeholder='Enter Sample Input:'
                                        error=''
                                        value={samplecase.input}
                                        onValueChange={event => onSampleCaseChange(index, 'input', event)}/>
                                    <div className='EditProposal-Case-Title'>Sample Output:</div>
                                    <TextareaError
                                        placeholder='Enter Sample Output:'
                                        error=''
                                        value={samplecase.output}
                                        onValueChange={event => onSampleCaseChange(index, 'output', event)}/>
                                </div>
                            )
                        })
                    }
                    <div className='EditProposal-Add-Case-Button'>
                        <DarkIconButton
                            icon={AddIcon}
                            alt='Addcase'
                            title='Add Case'
                            onClick={onAddSampleCase}/>
                    </div>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Hidden Cases:
                    </div>
                    {
                        hiddencases.map((hiddencase, index) => {
                            return (
                                <div key={index} className='EditProposal-Case-Container'>
                                    <div className='EditProposal-Case-Title'>Hidden Input:</div>
                                    <TextareaError
                                        placeholder='Enter Hidden Input:'
                                        error=''
                                        value={hiddencase.input}
                                        onValueChange={event => onHiddenCaseChange(index, 'input', event)}/>
                                    <div className='EditProposal-Case-Title'>Hidden Output:</div>
                                    <TextareaError
                                        placeholder='Enter Hidden Output:'
                                        error=''
                                        value={hiddencase.output}
                                        onValueChange={event => onHiddenCaseChange(index, 'output', event)}/>
                                </div>
                            )
                        })
                    }
                    <div className='EditProposal-Add-Case-Button'>
                        <DarkIconButton
                            icon={AddIcon}
                            alt='Addcase'
                            title='Add Case'
                            onClick={onAddHiddenCase}/>
                    </div>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Constraints:
                    </div>
                    <TextareaError
                        placeholder='Enter Problem Constraints'
                        error={constraintsError}
                        value={constraints}
                        onValueChange={onConstraintsChange}/>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Time Limit:
                    </div>
                    <InputError
                        inputType='number'
                        placeholder='Enter Time Limit'
                        error={timeLimitError}
                        value={timeLimit}
                        onValueChange={onTimeLimitChange}/>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Memory Limit:
                    </div>
                    <InputError
                        inputType='number'
                        placeholder='Enter Memory Limit'
                        error={memoryLimitError}
                        value={memoryLimit}
                        onValueChange={onMemoryLimitChange}/>
                </div>
                <div className='EditProposal-Field'>
                    <div className='EditProposal-Field-Title'>
                        Tags:
                    </div>
                    <TagInput
                        tags={tags}
                        setTags={setTags}
                        placeholder='Add Tags for this problem, (e.g., Stack, Binary Search)'/>
                </div>
            </div>
        </div>
    )
}

export default EditProposal;