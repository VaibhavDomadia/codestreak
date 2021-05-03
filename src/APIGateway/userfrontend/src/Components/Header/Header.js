import React from 'react';
import './Header.css';
import CodeIcon from '../../Icons/code-solid.svg';
import LinkButtonSolid from '../LinkButtonSolid/LinkButtonSolid';
import { Link } from 'react-router-dom';
import UserIcon from '../../Icons/user-circle-solid.svg';

const Header = (props) => {
    let controlls = (
        <div className='Header-AuthenticationControlls'>
            <Link to={{pathname: '/login', state: {from: 'Login Button'}}} className='Header-LoginButton'>Login</Link>
            <LinkButtonSolid path='/signup' value='Sign Up' />
        </div>
    )

    if(props.user) {
        controlls = (
            <div className='Header-UserControlls'>
                <img src={UserIcon} alt='UserIcon' className='Header-UserControlls-UserIcon'></img>
            </div>
        )
    }

    return (
        <div className='Header-Container'>
            <img src={CodeIcon} className='Header-Icon' alt='code'></img>
            <div className='Header-Title'>Codestreak</div>
            {controlls}
        </div>
    )
}

export default Header;