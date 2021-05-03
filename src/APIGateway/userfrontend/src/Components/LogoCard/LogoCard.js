import React from 'react';
import './LogoCard.css';
import LogoIcon from '../../Icons/code-solid-light.svg';

const LogoCard = (props) => {
    return (
        <div className='LogoCard'>
            <img src={LogoIcon} alt='Logo' className='LogoCard-Icon'></img>
            <div className='LogoCard-Title'>Codestreak</div>
        </div>
    )
}

export default LogoCard;