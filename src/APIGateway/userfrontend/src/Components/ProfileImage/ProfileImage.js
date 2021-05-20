import React from 'react';
import UserIcon from '../../Icons/user-circle-solid.svg';

const ProfileImage = (props) => {
    const { link, size } = props;
    
    const onError = (event) => {
        event.target.onerror = null;
        event.target.src = UserIcon;
    }

    const styles = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size/2}px`
    }

    return (
        <img src={link} alt='Profile' style={styles} onError={onError}></img>
    )
}

export default ProfileImage;