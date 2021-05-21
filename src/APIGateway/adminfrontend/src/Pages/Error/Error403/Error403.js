import React from 'react';
import './Error403.css';

const Error403 = (props) => {
    return (
        <div className='Error403-Container'>
            <div className='Error403-StatusCode'>
                403
            </div>
            <div className='Error403-Message'>
                Access Denied! You are not authorized to view this
            </div>
        </div>
    )
}

export default Error403;