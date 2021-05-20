import React from 'react';
import './LogoutButton.css';
import LogoutIcon from '../../Icons/sign-out-alt-solid.svg';

const LogoutButton = (props) => {
    const logout = () => {
        localStorage.removeItem('token');
        props.setUser(null);
    }

    return (
        <div className='LogoutButton' onClick={logout}>
            <img src={LogoutIcon} alt='Logout' className='LogoutButton-Icon'></img>
            <div className='LogoutButton-Title'>Logout</div>
        </div>
    )
}

export default LogoutButton;