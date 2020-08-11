import React, { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user/current-user.context';

import './header.styles.scss';

const handleClick = (location) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
   window.location.href = '/';
}

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
          <button className='option'  to = '/' onClick = {handleClick} >
            SIGN OUT
          </button>
        ) : (
          <Link className='option' to='/'>
            SIGN IN
          </Link>
        )}
        </div>
    </div>
  )
}

export default Header;