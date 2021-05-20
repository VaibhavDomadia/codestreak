import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../Components/Button/Button';
import InputError from '../../Components/InputError/InputError';
import ResponseMessageCard from '../../Components/ResponseMessageCard/ResponseMessageCard';
import './ForgotPassword.css';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState(null);
    const [messageColor, setMessageColor] = useState('eb4034');
    const history = useHistory();

    const onEmailChange = (event) => {
        setEmailError('');
        setEmail(event.target.value);
    }

    const onEmailSend = async () => {
        let isErrorPresent = false;
        if(email.trim() === '') {
            setEmailError('This Field is Required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            try {
                const response = await axios.post('/api/user/forgotpassword', { email });

                setMessageColor('32a852');
                setMessage(response.data.message);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    setMessageColor('eb4034');
                    setMessage(error.response.data.message);
                }
            }
        }
    }

    return (
        <div className='ForgotPassword'>
            <div className='ForgotPassword-Header'>Forgot Password</div>
            { message && <ResponseMessageCard color={messageColor} title={message}/> }
            <div className='ForgotPassword-Field'>
                <div className='ForgotPassword-Field-Title'>Email:</div>
                <InputError
                    inputType='email'
                    placeholder='Enter Your Email'
                    error={emailError}
                    value={email}
                    onValueChange={onEmailChange}/>
            </div>
            <div className='ForgotPassword-SendButton'>
                <Button
                    name='Send Email'
                    onClick={onEmailSend}/>
            </div>
        </div>
    )
}

export default ForgotPassword;