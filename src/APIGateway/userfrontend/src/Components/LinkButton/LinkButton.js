import React from 'react';
import './LinkButton.css';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
    return (
        <Link to={props.path} className='LinkButton'>
            {props.value}
        </Link>
    )
}

export default LinkButton;