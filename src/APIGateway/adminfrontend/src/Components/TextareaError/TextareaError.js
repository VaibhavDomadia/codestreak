import React from 'react';
import './TextareaError.css';

const TextareaError = (props) => {
    const { placeholder, error, color, value, onValueChange } = props;

    const textareeStyle = {};
    if(color) {
        textareeStyle.borderColor = color;
    }
    if(error) {
        textareeStyle.borderColor = 'rgb(235, 64, 52)';
    }

    return (
        <div className='TextareaError'>
            <textarea placeholder={placeholder} className='TextareaError-Textarea' style={textareeStyle} value={value} onChange={onValueChange}></textarea>
            {error !== '' && <div className='TextareaError-Error'>{error}</div>}
        </div>
    )
}

export default TextareaError;