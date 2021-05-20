import React from 'react';
import './Button.css';

const Button = (props) => {
    let { name, type, color, onClick } = props;

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
        <button className='Button-Container' style={style} onClick={onClick}>
            {name}
        </button>
    )
}

export default Button;