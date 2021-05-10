import React from 'react';
import './DarkLinkIconButton.css';
import { Link } from 'react-router-dom';

const DarkLinkIconButton = (props) => {
    const { to, icon, alt, title } = props;
    return (
        <Link to={to} className='DarkLinkIconButton'>
            <img src={icon} alt={alt} className='DarkLinkIconButton-Icon'></img>
            {title}
        </Link>
    )
}

export default DarkLinkIconButton;