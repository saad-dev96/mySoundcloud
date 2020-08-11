import React, { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import axios from 'axios';

import './header.styles.scss';

const handleClick = (location) => {
  const token = localStorage.getItem('token');
  const key = document.getElementById("search").value;
  axios.get("https://soud-cloud-backend.herokuapp.com/api/user/logout/", {
    headers: {
      'Authorization': `Token ${token}` 
    }
  })
  .then(res => {
    alert("Logged out");
  })
  .catch(res => 
    {alert(res.status)}
  );
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