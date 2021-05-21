import React, { useState } from 'react';
import './Select.css';
import Up from '../../Icons/caret-up-solid.svg';
import Down from '../../Icons/caret-down-solid.svg';

const Select = (props) => {
    const [open, setOpen] = useState(false);

    const { value, setValue, options } = props;

    const onToggleOpen = () => {
        setOpen(open => !open);
    }

    const dropdownStyle = {
        display: 'none'
    }
    if(open) {
        dropdownStyle.display = 'grid';
    }

    const onValueSelect = (value, event) => {
        setOpen(false);
        setValue(value);
    }

    return (
        <div className='Select'>
            <div className='Select-Value' onClick={onToggleOpen}>
                {value}
                {
                    open ?
                    <img src={Up} alt='up' className='Select-Icon'></img> :
                    <img src={Down} alt='down' className='Select-Icon'></img>
                }
            </div>
            <div className='Select-Dropdown' style={dropdownStyle}>
                {
                    options.map(option => {
                        return <div key={option} onClick={(event) => onValueSelect(option, event)}>{option}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Select;