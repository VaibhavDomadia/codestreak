import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../Components/Button/Button';
import InputError from '../../Components/InputError/InputError';
import ResponseMessageCard from '../../Components/ResponseMessageCard/ResponseMessageCard';
import './ResetPassword.css';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [message, setMessage] = useState(null);

    const history = useHistory();

    const token = props.match.params.token;

    const onPasswordChange = (event) => {
        setPasswordError('');
        setPassword(event.target.value);
    }

    const onConfirmPasswordChange = (event) => {
        setConfirmPasswordError('');
        setConfirmPassword(event.target.value);
    }

    const onPasswordReset = async () => {
        let isErrorPresent = false;
        if(password.trim() === '') {
            setPasswordError('This Field is required');
            isErrorPresent = true;
        }
        if(confirmPassword.trim() === '') {
            setConfirmPasswordError('This Field is required');
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
                const response = await axios.post('/api/user/resetpassword', {
                    token,
                    password
                });

                setMessage(response.data.message);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    history.push('/404');
                }
            }
        }
    }

    return (
        <div className='ResetPassword'>
            <div className='ResetPassword-Header'>
                Reset Password
            </div>
            { message && <ResponseMessageCard color='32a852' title={message}/> }
            <div className='ResetPassword-Field'>
                <div className='ResetPassword-Field-Title'>
                    New Password:
                </div>
                <InputError
                    inputType='password'
                    placeholder='Enter New Password'
                    error={passwordError}
                    value={password}
                    onValueChange={onPasswordChange}/>
            </div>
            <div className='ResetPassword-Field'>
                <div className='ResetPassword-Field-Title'>
                    Confirm Password:
                </div>
                <InputError
                    inputType='password'
                    placeholder='Confirm New Password'
                    error={confirmPasswordError}
                    value={confirmPassword}
                    onValueChange={onConfirmPasswordChange}/>
            </div>
            <div className='ResetPassword-SaveButton'>
                <Button
                    name='Reset'
                    onClick={onPasswordReset}/>
            </div>
        </div>
    )
}

export default ResetPassword;