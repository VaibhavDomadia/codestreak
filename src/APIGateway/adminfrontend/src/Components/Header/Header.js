import React from 'react';
import './Header.css';
import CodeIcon from '../../Icons/code-solid.svg';
import LinkButton from '../LinkButton/LinkButton';
import Button from '../Button/Button';

const Header = (props) => {
    const { user } = props;

    const logout = () => {
        localStorage.removeItem('token');
        props.setUser(null);
    }

    return (
        <div className='Header-Container'>
            <img src={CodeIcon} className='Header-Icon' alt='code'></img>
            <div className='Header-Title'>Codestreak</div>
            <div className='Header-Title-Admin'>Admin</div>
            <div className='Header-Buttons'>
                {
                    user ?
                    <Button name='Logout' onClick={logout}/> :
                    <LinkButton path={`/login`} name='Login'/>
                }
            </div>    
        </div>
    )
}

export default Header;