import React from 'react';
import LogoCard from '../../Components/LogoCard/LogoCard';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div className='HomePage'>
            <div className='HomePage-WelcomeMessage'>
                Welcome To
            </div>
            <LogoCard/>
        </div>
    )
}

export default HomePage;