import React from 'react';
import './LinkButton.css';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
    let { name, type, color, path } = props;

    if(!color) {
        color = '#1389fd';
    }

    let style = {};

    if(type === 'solid') {
        style = {
            border: `2px solid ${color}`,
            backgroundColor: `${color}`,
            color: `#ffffff`
        }
    }
    else {
        style = {
            border: `2px solid ${color}`,
            backgroundColor: '#ffffff',
            color: `${color}`
        }
    }

    return (
        <Link to={path} className='LinkButton' style={style}>
            {name}
        </Link>
    )
}

export default LinkButton;