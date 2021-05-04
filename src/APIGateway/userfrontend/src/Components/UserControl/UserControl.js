import React from 'react';
import { Link } from 'react-router-dom';
import './UserControl.css';

const UserControl = (props) => {
    const { to, icon, name } = props;
    return (
        <Link to={to} className='UserControl'>
            <img src={icon} alt={name} className='UserControl-Icon'></img>
            <div className='UserControl-Name'>{name}</div>
        </Link>
    )
}

export default UserControl;