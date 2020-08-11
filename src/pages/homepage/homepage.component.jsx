import React, {useState, Component} from 'react';
import PlaySong from '../../components/playsong/playsong.component'
import './homepage.styles.scss';
import axios from 'axios'
import { render } from '@testing-library/react';
import e from 'cors';
class HomePage extends Component{
  
  state = {
    mylist : [],
    searchedList:[],
    searchFlag:false,
    listFlag:false
  }

  handleSearch = () => {
    const token = localStorage.getItem('token');
    const key = document.getElementById("search").value;
    axios.get(`https://soud-cloud-backend.herokuapp.com/api/song/search/?q=${key}`, {
      headers: {
        'Authorization': `Token ${token}` 
      }
    })
    .then(res => {
      this.setState({searchedList : res.data});
      if (this.state.searchedList.length!==0)
      {
        this.setState({searchFlag : true});
      }
      else {
        alert("nothing exists with your search ");
        this.setState({searchFlag : false});
      }
    })
    .catch(res => 
    {alert("nothing exists with your search ")});
  
}
  handleAll = () => {
   
      const token = localStorage.getItem('token');
      axios.get('https://soud-cloud-backend.herokuapp.com/api/song/list/', {
        headers: {
          'Authorization': `Token ${token}` 
        }
      })
      .then(res => {
        this.setState({mylist : res.data})
        if (this.state.mylist.length!==0)
      {
        this.setState({listFlag : true});
      }
      else {
        alert("nothing exists in this list ");
        this.setState({listFlag : false});
      } 
      })
      .catch(res => 
        {alert("nothing found due to " + res.status)});
      console.log(localStorage.getItem('token'));
  }
  componentDidMount(){

  }

  render(){
    const user = localStorage.getItem('user');
    console.log(localStorage.getItem('token'));
    return(
    <div className='homepage'>
      <div className='option'/>

      welcome {user}
      <div className='all'>
      <button className='button' type="submit" onClick={this.handleAll}>view all songs</button>
      {this.state.listFlag? ( <PlaySong  list={this.state.mylist}/>) : null}
      </div>
      ---------------------------------------------------------------------------------
      ---------------------------------------------------------------------------------
      <div className='searching'>
      <input type="text" placeholder="Search Songs" id= 'search'></input>
      <button className='button' type="submit" onClick={this.handleSearch}>Search</button>
      {this.state.searchFlag? (<PlaySong  list={this.state.searchedList}/>) : null}
      </div>
    
  
    </div>
    );
}
}



export default HomePage;
