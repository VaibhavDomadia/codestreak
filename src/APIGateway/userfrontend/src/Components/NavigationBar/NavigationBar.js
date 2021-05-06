import React from 'react';
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';

const NavigationBar = (props) => {
    return (
        <div className='NavigationBar-Container'>
            <NavLink to='/' exact className='NavigationBar-Tile' activeClassName='NavigationBar-Tile-Active'>
                Home
            </NavLink>
            <NavLink to='/contest' className='NavigationBar-Tile' activeClassName='NavigationBar-Tile-Active'>
                Contests
            </NavLink>
            <NavLink to='/problem' className='NavigationBar-Tile' activeClassName='NavigationBar-Tile-Active'>
                Problems
            </NavLink>
            <NavLink to='/blog' className='NavigationBar-Tile' activeClassName='NavigationBar-Tile-Active'>
                Blogs
            </NavLink>
        </div>
    )
}

export default NavigationBar;