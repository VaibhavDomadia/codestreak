import React from 'react';
import './LinkButtonSolid.css';
import { Link } from 'react-router-dom';

const LinkButtonSolid = (props) => {
    return (
        <Link to={props.path} className='LinkButtonSolid'>
            {props.value}
        </Link>
    )
}

export default LinkButtonSolid;