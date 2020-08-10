import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user/current-user.context';

import './header.styles.scss';

const Header = () => {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className='header'>
      <div className='options'>
        <Link className='option' to='/home'>
          Home
        </Link>
        <Link className='option' to='/profile'>
          Profile
        </Link>
        {currentUser ? (
          <button className='option'  to = '/' onClick = {() => {return (localStorage.removeItem('token'), window.location.reload())}} >
            SIGN OUT
          </button>
        ) : (
          <Link className='option' to='/'>
            SIGN IN
          </Link>
        )}
        <div className='option'>
        </div><input type="text" placeholder="Search Songs"></input>
        <button type="submit">Submit</button>
        </div>
    </div>
  )
}

export default Header;