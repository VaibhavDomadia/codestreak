import React from 'react';
import './Error404.css';

const Error404 = (props) => {
    return (
        <div className='Error404-Container'>
            <div className='Error404-StatusCode'>
                404
            </div>
            <div className='Error404-Message'>
                Resource Not Found
            </div>
        </div>
    )
}

export default Error404;