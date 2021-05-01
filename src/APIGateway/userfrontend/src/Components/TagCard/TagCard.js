import React from 'react';
import './TagCard.css';

const TagCard = (props) => {
    return (
        <div className='TagCard'>
            <img src={props.icon} className='TagCard-Icon' alt={props.alt}></img>
            <div className='TagCard-Title'>
                {props.title}:
            </div>
            <div className='TagCard-Value'>
                {props.value}
            </div>
        </div>
    )
}

export default TagCard;