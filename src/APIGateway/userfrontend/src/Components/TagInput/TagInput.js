import React, { useState } from 'react';
import './TagInput.css';
import DeleteTagIcon from '../../Icons/times-circle-solid.svg';

const TagInput = (props) => {
    const [value, setValue] = useState('');
    const { tags, setTags, placeholder } = props;

    const onValueChange = (event) => {
        setValue(event.target.value);
    }

    const onEnter = (event) => {
        if(event.keyCode === 13) {
            onTagAdd();
        }
    }

    const onTagAdd = () => {
        const addValue = value.toLowerCase().trim();
        const isTagPresent = tags.includes(addValue);
        if(!isTagPresent && addValue !== '') {
            setTags([...tags, addValue]);
            setValue('');
        }
    }

    const onTagRemove = (value, event) => {
        const newTags = tags.filter(tag => tag !== value);
        setTags(newTags);
    }

    return (
        <div className='TagInput-Container'>
            <div className='TagInput-InputField-Container'>
                <input type='text' placeholder={placeholder} className='TagInput-InputField' value={value} onChange={onValueChange} onKeyDown={onEnter}/>
                <button className='TagInput-InputField-AddButton' onClick={onTagAdd}>
                    Add
                </button>
            </div>
            {
                tags.length !== 0 &&
                <div className='TagInput-Tags-Container'>
                    {
                        tags.map((tag, index) => {
                            return (
                                <div key={index} className='TagInput-Tag' onClick={event => onTagRemove(tag)}>
                                    <img src={DeleteTagIcon} alt={tag} className='TagInput-Tag-DeleteIcon'></img>
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default TagInput;