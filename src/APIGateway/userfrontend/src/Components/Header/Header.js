import React from 'react';
import './Header.css';
import CodeIcon from '../../Icons/code-solid.svg';

const Header = (props) => {
    return (
        <div className='Header-Container'>
            <img src={CodeIcon} className='Header-Icon' alt='code'></img>
            <div className='Header-Title'>Codestreak</div>
        </div>
    )
}

export default Header;