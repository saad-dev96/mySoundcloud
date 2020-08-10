
import React  from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import Profile from './pages/profile/profile.component'
import './App.css';
import CurrentUserContext from './contexts/current-user/current-user.context';
import ForgotPassword from './components/forgot-password/forgot-password.component';

import {createStructuredSelector} from 'reselect'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {

    const token = localStorage.getItem('token');

    this.setState({
      currentUser: token
    });
  }

  componentWillUnmount() {
    //this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <BrowserRouter>     
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
          <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/forgot' component={ForgotPassword} />
            <Route
              exact
              path='/'
              render ={()=>this.state.currentUser ? (<Redirect to = '/home'/>): (<SignInAndSignUpPage/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

