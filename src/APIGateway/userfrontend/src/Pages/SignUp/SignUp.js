import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../Components/Button/Button';
import InputError from '../../Components/InputError/InputError';
import LogoCard from '../../Components/LogoCard/LogoCard';
import ResponseMessageCard from '../../Components/ResponseMessageCard/ResponseMessageCard';
import { isTokenExpired } from '../../util/authentication';
import './SignUp.css';

const SignUp = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [handle, setHandle] = useState('');

    const [message, setMessage] = useState(null);
    const [messageColor, setMessageColor] = useState('eb4034');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [handleError, setHandleError] = useState('');

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            if(isTokenExpired(token)) {
                localStorage.removeItem('token');
                props.setUser(null);
            }
            else {
                if(history.location.state && history.location.state.from) {
                    history.goBack();
                }
                else {
                    history.push('/');
                }
            }
        }
    });

    const onFirstNameChange = (event) => {
        setFirstNameError('');
        setFirstName(event.target.value);
    }

    const onLastNameChange = (event) => {
        setLastNameError('');
        setLastName(event.target.value);
    }

    const onHandleChange = (event) => {
        setHandleError('');
        setHandle(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPasswordError('');
        setPassword(event.target.value);
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPasswordError('');
        setConfirmPassword(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmailError('');
        setEmail(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        let isErrorPresent = false;
        if(firstName.trim() === '') {
            setFirstNameError('This Field is Required');
            isErrorPresent = true;
        }
        if(lastName.trim() === '') {
            setLastNameError('This Field is Required');
            isErrorPresent = true;
        }
        if(email.trim() === '') {
            setEmailError('This Field is Required');
            isErrorPresent = true;
        }
        if(password.trim() === '') {
            setPasswordError('This Field is Required');
            isErrorPresent = true;
        }
        if(handle.trim() === '') {
            setHandleError('This Field is Required');
            isErrorPresent = true;
        }
        if(confirmPassword.trim() === '') {
            setConfirmPasswordError('This Field is Required');
            isErrorPresent = true;
        }
        if(confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError(`Password and Confirm Password doesn't match`);
            isErrorPresent = true;
        }
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            setPasswordError(`Password must contain atleast one digit, one lowercase alphabet, one uppercase alphabet, and must be atleast 8 characters long.`);
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            try {
                const response = await axios.post('/api/user/signup', {
                    firstName,
                    lastName,
                    handle,
                    email,
                    password
                });

                setMessage(response.data.message);
                setMessageColor('32a852')
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.push('/500');
                }
                else if(error.response.status === 404) {
                    history.push('/404');
                }
                else {
                    setMessage(error.response.data.message);
                    setMessageColor('eb4034')
                }
            }
        }
    }

    return (
        <div className='SignUp'>
            <LogoCard/>
            { message && <ResponseMessageCard color={messageColor} title={message}/> }
            <form className='Signup-Form'>
                <div className='Signup-Form-UserName'>
                    <div className='Signup-Form-Field'>
                        <div className='Signup-Form-Field-Title'>First Name</div>
                        <InputError
                            inputType='text'
                            placeholder='Enter First Name'
                            error={firstNameError}
                            value={firstName}
                            onValueChange={onFirstNameChange}/>
                    </div>
                    <div className='Signup-Form-Field'>
                        <div className='Signup-Form-Field-Title'>Last Name</div>
                        <InputError
                            inputType='text'
                            placeholder='Enter Last Name'
                            error={lastNameError}
                            value={lastName}
                            onValueChange={onLastNameChange}/>
                    </div>
                </div>
                <div className='Signup-Form-Field'>
                    <div className='Signup-Form-Field-Title'>Email</div>
                    <InputError
                        inputType='email'
                        placeholder='Enter Email'
                        error={emailError}
                        value={email}
                        onValueChange={onEmailChange}/>
                </div>
                <div className='Signup-Form-Field'>
                    <div className='Signup-Form-Field-Title'>Handle</div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Handle'
                        error={handleError}
                        value={handle}
                        onValueChange={onHandleChange}/>
                </div>
                <div className='Signup-Form-Field'>
                    <div className='Signup-Form-Field-Title'>Password</div>
                    <InputError
                        inputType='password'
                        placeholder='Enter Password'
                        error={passwordError}
                        value={password}
                        onValueChange={onPasswordChange}/>
                </div>
                <div className='Signup-Form-Field'>
                    <div className='Signup-Form-Field-Title'>Confirm Password</div>
                    <InputError
                        inputType='password'
                        placeholder='Retype Password'
                        error={confirmPasswordError}
                        value={confirmPassword}
                        onValueChange={onConfirmPasswordChange}/>
                </div>
                <div className='Singup-Form-SubmitButton'>
                    <Button name='Sign Up' onClick={onSubmit}/>
                </div>
            </form>
        </div>
    )
}

export default SignUp;