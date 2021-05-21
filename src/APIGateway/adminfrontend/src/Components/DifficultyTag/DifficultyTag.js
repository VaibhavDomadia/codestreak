import React from 'react';
import './DifficultyTag.css';

const DifficultyTag = (props) => {
    let { difficulty, color } = props;

    const style = {
        backgroundColor: color
    }

    return (
        <div className='DifficultyTag' style={style}>
            {difficulty}
        </div>
    )
}

export default DifficultyTag;