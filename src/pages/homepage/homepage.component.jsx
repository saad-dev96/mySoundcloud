import React, { useState, Component } from 'react';
import PlaySong from '../../components/playsong/playsong.component'
import './homepage.styles.scss';
import axios from 'axios'
import { render } from '@testing-library/react';
import e from 'cors';
import { URL } from '../../env'
import { searchSongs } from '../../env'
import { listSongs } from '../../env'
import { setItem } from '../../utils'
import { removeItem } from '../../utils'
import { getItem } from '../../utils'

class HomePage extends Component {

  state = {
    mylist: [],
    searchedList: [],
    searchFlag: false,
    listFlag: false
  }

  handleSearchClick = () => {
    const token = getItem('token');
    const key = document.getElementById("search").value;
    axios.get(`${URL}${searchSongs}${key}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ searchedList: res.data });
        if (this.state.searchedList.length !== 0) {
          this.setState({ searchFlag: true });
        }
        else {
          alert("nothing exists with your search ");
          this.setState({ searchFlag: false });
        }
      })
      .catch(res => { alert("nothing exists with your search ") });

  }
  handleListClick = () => {

    const token = getItem('token');
    axios.get(`${URL}${listSongs}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ mylist: res.data })
        if (this.state.mylist.length !== 0) {
          this.setState({ listFlag: true });
        }
        else {
          alert("nothing exists in this list ");
          this.setState({ listFlag: false });
        }
      })
      .catch(res => { alert("nothing found due to " + res.status) });
  }
  componentDidMount() {

  }

  render() {
    const user = getItem('user');
    console.log(getItem('token'));
    return (
      <div className='homepage'>
        <div className='option' />

      <h1>welcome {user}</h1>
      <div className='screen'>
        <div className='all'>
          <button className='viewAll' type="submit" onClick={this.handleListClick}>view all songs</button>
          {this.state.listFlag ? (<PlaySong str={'All songs are'} newFunc = {this.handleListClick} list={this.state.mylist} />) : null}
        </div>
       
        <div className='searching'>
          <input className='search'type="text" placeholder="Search Songs" id='search'></input>
          <button className='searchbutton' type="submit" onClick={this.handleSearchClick}>Search</button>
          {this.state.searchFlag ? (<PlaySong str={'Searched songs are'} list={this.state.searchedList} />) : null}
        </div>
      </div>
      </div>
    );
  }
}



export default HomePage;
