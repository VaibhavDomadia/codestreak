import React from 'react';
import './DarkSmallIconButton.css';

const DarkSmallIconButton = (props) => {
    const { icon, alt, title, onClick } = props;
    return (
        <button className='DarkSmallIconButton' onClick={onClick}>
            <img src={icon} alt={alt} className='DarkSmallIconButton-Icon'></img>
            {title}
        </button>
    )
}

export default DarkSmallIconButton;