import React from 'react';
import './Header.css';
import CodeIcon from '../../Icons/code-solid.svg';
import LinkButtonSolid from '../LinkButtonSolid/LinkButtonSolid';
import { Link } from 'react-router-dom';
import UserIcon from '../../Icons/user-circle-solid.svg';
import UserControl from '../UserControl/UserControl';
import ProfileIcon from '../../Icons/id-badge-solid.svg';
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = (props) => {
    let controlls = (
        <div className='Header-AuthenticationControlls'>
            <Link to={{pathname: '/login', state: {from: 'Login Button'}}} className='Header-LoginButton'>Login</Link>
            <LinkButtonSolid path='/signup' value='Sign Up' />
        </div>
    )

    if(props.user) {
        controlls = (
            <div className='Header-UserControlls'>
                <img src={UserIcon} alt='UserIcon' className='Header-UserControlls-UserIcon'></img>
                <div className='Header-UserControlls-Dropdown-Container'>
                    <UserControl to={`/user/${props.user.userID}`} icon={ProfileIcon} name='Profile'/>
                    <LogoutButton setUser={props.setUser}/>
                </div>
            </div>
        )
    }

    return (
        <div className='Header-Container'>
            <img src={CodeIcon} className='Header-Icon' alt='code'></img>
            <div className='Header-Title'>Codestreak</div>
            {controlls}
        </div>
    )
}

export default Header;