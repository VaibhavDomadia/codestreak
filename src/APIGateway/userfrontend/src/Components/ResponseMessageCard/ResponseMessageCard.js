import React from 'react';
import './ResponseMessageCard.css';

const ResponseMessageCard = (props) => {
    const { color, title } = props;
    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);

    const conatinerStyle = {
        border: `2px solid #${color}`,
        backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.1)`,
        color: `#${color}`
    }
    
    return (
        <div className='ResponseMessageCard' style={conatinerStyle}>
            <div className='ResponseMessageCard-Title'>{title}</div>
        </div>
    )
}

export default ResponseMessageCard;