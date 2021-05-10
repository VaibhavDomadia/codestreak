import React from 'react';
import './DarkIconButton.css';

const DarkIconButton = (props) => {
    const { icon, alt, title, onClick } = props;
    return (
        <button className='DarkIconButton' onClick={onClick}>
            <img src={icon} alt={alt} className='DarkIconButton-Icon'></img>
            {title}
        </button>
    )
}

export default DarkIconButton;