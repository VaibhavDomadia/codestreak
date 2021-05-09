import React from 'react';
import './LinkButton.css';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
    const { color, path, value } = props;
    
    const style = {
        color
    }

    return (
        <Link to={path} className='LinkButton' style={style}>
            {value}
        </Link>
    )
}

export default LinkButton;