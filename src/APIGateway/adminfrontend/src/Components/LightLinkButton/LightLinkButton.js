import React from 'react';
import './LightLinkButton.css';
import { Link } from 'react-router-dom';

const LightLinkButton = (props) => {
    let { name, color, path } = props;

    let style = {
        color
    }

    return (
        <Link to={path} className='LightLinkButton' style={style}>
            {name}
        </Link>
    )
}

export default LightLinkButton;