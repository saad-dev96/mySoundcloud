import React, { useContext, useState } from 'react';
import { URL, viewLiked, listSongs } from '../../env'
import { getItem } from '../../utils'
import axios from 'axios'
import PlaySong from '../../components/playsong/playsong.component'
import flagContext from '../../contexts/flag.context'
import './profile.styles.scss';
const myList = [];

const viewLikedSongs = (flag, setFlag, setList, passingList) => {
  console.log("called");
  const token = getItem('token');
  axios.get(`${URL}${viewLiked}`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
    .then(res => {
      setList(res.data);
      setFlag(true);
    })
    .catch(res => { alert("nothing found due to " + res.status) });
}

const handleListClick = (list) => {
  const token = getItem('token');
  axios.get(`${URL}${listSongs}`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  })
    .then(res => {
      list = res.data;
    })
    .catch(res => { alert("nothing found due to " + res.status) });
}

const Profile = () => {
  const [flag, setFlag] = useState(false);
  const [passingList, setList] = useState(null);
  return (
    <div className='profile'>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
  </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onClick={() => viewLikedSongs(flag, setFlag, setList, passingList)} >view liked songs</a>
        </div>
      </div>
      <div>
        {
          flag ? (<PlaySong str={'Liked songs are'} likedFlag={true} set={setList} likedFunc={() => viewLikedSongs(flag, setFlag, setList, passingList)} list={passingList} />) : null
        }
      </div>
    </div>
  )
}

export default Profile;

