import React from 'react';
import './InputError.css';

const InputError = (props) => {
    const { inputType, placeholder, error, color, value, onValueChange } = props;

    const inputStyle = {};
    if(color) {
        inputStyle.borderColor = color;
    }
    if(error) {
        inputStyle.borderColor = 'rgb(235, 64, 52)';
    }

    return (
        <div className='InputError'>
            <input type={inputType} placeholder={placeholder} className='InputError-Input' style={inputStyle} value={value} onChange={onValueChange}/>
            {error !== '' && <div className='InputError-Error'>{error}</div>}
        </div>
    )
}

export default InputError;