import React from 'react';
import './ProfileInfoBar.css';

const ProfileInfoBar = (props) => {
    const { icon, title, value } = props;
    return (
        <div className='ProfileInfoBar'>
            <img src={icon} alt={title} className='ProfileInfoBar-Icon'></img>
            <div className='ProfileInfoBar-Title'>{title}:</div>
            <div className='ProfileInfoBar-Value'>{value}</div>
        </div>
    )
}

export default ProfileInfoBar;