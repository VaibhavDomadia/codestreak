import React from 'react';
import './DarkSmallLinkIconButton.css';
import { Link } from 'react-router-dom';

const DarkSmallLinkIconButton = (props) => {
    const { to, icon, alt, title } = props;
    return (
        <Link to={to} className='DarkSmallLinkIconButton'>
            <img src={icon} alt={alt} className='DarkSmallLinkIconButton-Icon'></img>
            {title}
        </Link>
    )
}

export default DarkSmallLinkIconButton;