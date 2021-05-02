import React from 'react';
import './Header.css';
import CodeIcon from '../../Icons/code-solid.svg';
import LinkButton from '../LinkButton/LinkButton';
import LinkButtonSolid from '../LinkButtonSolid/LinkButtonSolid';

const Header = (props) => {
    return (
        <div className='Header-Container'>
            <img src={CodeIcon} className='Header-Icon' alt='code'></img>
            <div className='Header-Title'>Codestreak</div>
            <LinkButton path='/login' value='Login' />
            <LinkButtonSolid path='/signup' value='Sign Up' />
        </div>
    )
}

export default Header;