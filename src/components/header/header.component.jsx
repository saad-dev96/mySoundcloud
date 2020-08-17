import React, { useContext, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import axios from 'axios';
import {URL} from '../../env'
import {logout} from '../../env'
import './header.styles.scss';
import {setItem} from '../../utils'
import {removeItem} from '../../utils'
import {getItem} from '../../utils'

const handleClick = (location) => {
  console.log("hello");
  const token = getItem('token');
  console.log(token);
  const user = getItem('user');
  console.log(user);
  axios.get(`${URL}${logout}`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
    .then(res => {
      alert("Logged out");
    })
    .catch(res => { alert(res.status) }
    );
  removeItem('token');
  removeItem('user');
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
          <Link className='option' to='/' onClick={handleClick} >
            SIGN OUT
          </Link>
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