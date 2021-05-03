import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { getUser, isTokenExpired } from '../../util/authentication';
import LogoCard from '../../Components/LogoCard/LogoCard';
import ResponseMessageCard from '../../Components/ResponseMessageCard/ResponseMessageCard';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
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
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const login = async (event) => {
        event.preventDefault();

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

    return (
        <div className='LoginPage-Container'>
            <form onSubmit={login} className='LoginPage-Form'>
                <LogoCard />
                { error && <ResponseMessageCard color='eb4034' title={error}/>}
                <input type='email' placeholder='Email ID' value={email} onChange={onEmailChange} className='LoginPage-InputField'/>
                <input type='password' placeholder='Password' value={password} onChange={onPasswordChange} className='LoginPage-InputField'/>
                <input type='submit' value='Login' className='LoginPage-SubmitButton'/>
            </form>
        </div>
    )
}

export default Login;