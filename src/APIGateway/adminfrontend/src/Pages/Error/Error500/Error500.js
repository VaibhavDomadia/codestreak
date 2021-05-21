import React from 'react';
import './Error500.css';

const Error500 = (props) => {
    return (
        <div className='Error500-Container'>
            <div className='Error500-StatusCode'>
                500
            </div>
            <div className='Error500-Message'>
                Something went wrong on our side. We are fixing this issue. Sorry for inconvenience
            </div>
        </div>
    )
}

export default Error500;