import React, {useState} from 'react';
import PlaySong from '../../components/playsong/playsong.component'
import './homepage.styles.scss';
import axios from 'axios'
let Mylist = [];

const fun = (Mylist) => {
  const [list, setlist] = useState(Mylist);
  console.log("function  " + Mylist);
} 

const HomePage = () => {
  
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  axios.get('https://soud-cloud-backend.herokuapp.com/api/song/list/', {
    headers: {
      'Authorization': `Token ${token}` 
    }
  })
  .then(res => {
    Mylist = res.data;
    fun(Mylist);
    localStorage.setItem('list', Mylist);
  });
  console.log(Mylist);
  const [list, setlist] = useState(Mylist);
  console.log(list);

  return(
  <div className='homepage'>
   {user}  welcome
   <PlaySong list={list} />
  </div>
  )
}


export default HomePage;
