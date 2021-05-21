import axios from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';
import InputError from '../../Components/InputError/InputError';
import Select from '../../Components/Select/Select';
import TagInput from '../../Components/TagInput/TagInput';
import TextareaError from '../../Components/TextareaError/TextareaError';
import EditIcon from '../../Icons/pen-solid.svg';
import AddIcon from '../../Icons/plus-solid.svg';
import './EditProblem.css';
import { useHistory } from 'react-router';

const EditProblem = (props) => {
    const [problem, setProblem] = useState('');
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

    const problemID = props.match.params.problemID;

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/api/problem/${problemID}`);

                const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memory, tags } = response.data.problem;

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
                setProblem(response.data.problem);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Problem'});
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

        fetchProblem();
    }, [problemID]);

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
            try {
                const response = await axios.put(`/api/problem/${problemID}`, {
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
                    tags,
                    accessTime: problem.accessTime,
                    duration: problem.duration,
                    contestID: problem.contestID
                });

                history.push(`/problem/${problemID}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Problem'});
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
        <div className='EditProblem-Container'>
            <div className='EditProblem-Header'>
                <div className='EditProblem-Header-Title'>
                    Edit Problem
                </div>
                <DarkIconButton
                    icon={EditIcon}
                    alt='EditProblem'
                    title='Edit'
                    onClick={onEdit}/>
            </div>
            <div className='EditProblem-Field-Container'>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Problem Name:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Problem Name'
                        error={nameError}
                        value={name}
                        onValueChange={onNameChange}/>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Difficulty:
                    </div>
                    <div className='EditProblem-Difficulty-Select'>
                        <Select
                            value={difficulty}
                            setValue={onDifficultyChange}
                            options={['Easy', 'Medium', 'Hard']}/>
                    </div>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Problem Statement:
                    </div>
                    <TextareaError
                        placeholder='Enter Problem Statement'
                        error={statementError}
                        value={statement}
                        onValueChange={onStatementChange}/>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Sample Cases:
                    </div>
                    {
                        samplecases.map((samplecase, index) => {
                            return (
                                <div key={index} className='EditProblem-Case-Container'>
                                    <div className='EditProblem-Case-Title'>Sample Input:</div>
                                    <TextareaError
                                        placeholder='Enter Sample Input:'
                                        error=''
                                        value={samplecase.input}
                                        onValueChange={event => onSampleCaseChange(index, 'input', event)}/>
                                    <div className='EditProblem-Case-Title'>Sample Output:</div>
                                    <TextareaError
                                        placeholder='Enter Sample Output:'
                                        error=''
                                        value={samplecase.output}
                                        onValueChange={event => onSampleCaseChange(index, 'output', event)}/>
                                </div>
                            )
                        })
                    }
                    <div className='EditProblem-Add-Case-Button'>
                        <DarkIconButton
                            icon={AddIcon}
                            alt='Addcase'
                            title='Add Case'
                            onClick={onAddSampleCase}/>
                    </div>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Hidden Cases:
                    </div>
                    {
                        hiddencases.map((hiddencase, index) => {
                            return (
                                <div key={index} className='EditProblem-Case-Container'>
                                    <div className='EditProblem-Case-Title'>Hidden Input:</div>
                                    <TextareaError
                                        placeholder='Enter Hidden Input:'
                                        error=''
                                        value={hiddencase.input}
                                        onValueChange={event => onHiddenCaseChange(index, 'input', event)}/>
                                    <div className='EditProblem-Case-Title'>Hidden Output:</div>
                                    <TextareaError
                                        placeholder='Enter Hidden Output:'
                                        error=''
                                        value={hiddencase.output}
                                        onValueChange={event => onHiddenCaseChange(index, 'output', event)}/>
                                </div>
                            )
                        })
                    }
                    <div className='EditProblem-Add-Case-Button'>
                        <DarkIconButton
                            icon={AddIcon}
                            alt='Addcase'
                            title='Add Case'
                            onClick={onAddHiddenCase}/>
                    </div>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Constraints:
                    </div>
                    <TextareaError
                        placeholder='Enter Problem Constraints'
                        error={constraintsError}
                        value={constraints}
                        onValueChange={onConstraintsChange}/>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Time Limit:
                    </div>
                    <InputError
                        inputType='number'
                        placeholder='Enter Time Limit'
                        error={timeLimitError}
                        value={timeLimit}
                        onValueChange={onTimeLimitChange}/>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
                        Memory Limit:
                    </div>
                    <InputError
                        inputType='number'
                        placeholder='Enter Memory Limit'
                        error={memoryLimitError}
                        value={memoryLimit}
                        onValueChange={onMemoryLimitChange}/>
                </div>
                <div className='EditProblem-Field'>
                    <div className='EditProblem-Field-Title'>
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

export default EditProblem;