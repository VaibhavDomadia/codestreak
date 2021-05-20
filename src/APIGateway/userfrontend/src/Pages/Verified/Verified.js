import React, { useEffect, useState } from 'react';
import './Verified.css';
import EmailIcon from '../../Icons/envelope-solid.svg';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

const Verified = (props) => {
    const [verified, setVerified] = useState(false);
    const token = props.match.params.token;

    const history = useHistory();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post('/api/user/verify', {token});

                setVerified(true);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        verifyToken();
    }, [token]);

    let renderVerified = <Spinner/>;
    if(verified) {
        renderVerified = (
            <div className='Verified'>
                <div className='Verfied-Message'>
                    <img src={EmailIcon} alt='Email' className='Verified-Icon'></img>
                    Your Email Address Has Been Verified
                </div>
                <div className='Verified-Login'>
                    Please <Link to='/login' className='Verified-Login-Link'>Login</Link> to continue
                </div>
            </div>
        )
    }

    return renderVerified;
}

export default Verified;