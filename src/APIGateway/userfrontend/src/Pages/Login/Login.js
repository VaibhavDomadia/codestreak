import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { getUser, isTokenExpired } from '../../util/authentication';
import LogoCard from '../../Components/LogoCard/LogoCard';
import ResponseMessageCard from '../../Components/ResponseMessageCard/ResponseMessageCard';
import InputError from '../../Components/InputError/InputError';
import Button from '../../Components/Button/Button';
import LinkButton from '../../Components/LinkButton/LinkButton';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const onEmailChange = (event) => {
        setEmailError('');
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPasswordError('');
        setPassword(event.target.value);
    }

    const login = async (event) => {
        event.preventDefault();

        let isErrorPresent = false;
        if(email.trim() === '') {
            setEmailError('This Field is Required');
            isErrorPresent = true;
        }
        if(password.trim() === '') {
            setPasswordError('This Field is Required');
            isErrorPresent = true;
        }

        if(!isErrorPresent) {
            try {
                const response = await axios.post('/api/user/login', { email, password });
                const token = response.data.token;
                const user = getUser(token);
                localStorage.setItem('token', token);
                props.setUser(user);
            }
            catch(error) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className='LoginPage-Container'>
            <form className='LoginPage-Form'>
                <LogoCard />
                { error && <ResponseMessageCard color='eb4034' title={error}/>}
                <div className='LoginPage-Field'>
                    <div className='LoginPage-Field-Title'>
                        Email:
                    </div>
                    <InputError
                        inputType='email'
                        placeholder='Enter Your Email'
                        error={emailError}
                        value={email}
                        onValueChange={onEmailChange}/>
                </div>
                <div className='LoginPage-Field'>
                    <div className='LoginPage-Field-Title'>
                        Password:
                    </div>
                    <InputError
                        inputType='password'
                        placeholder='Enter Your Password'
                        error={passwordError}
                        value={password}
                        onValueChange={onPasswordChange}/>
                </div>
                <div className='LoginPage-Buttons'>
                    <Button name='Login' type='solid' onClick={login}/>
                    <LinkButton path='/forgotpassword' type='solid' name='Reset Password'/>
                </div>
            </form>
        </div>
    )
}

export default Login;