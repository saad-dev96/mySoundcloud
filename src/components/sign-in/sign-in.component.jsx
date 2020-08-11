import React, {useContext} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: ''
    };
  }

  handleSubmitForget = () => {

    {
      const { history } = this.props;
      if(history) history.push('/forgot');
     }
    }

  handleSubmit = (event)  => {

    event.preventDefault();
    const { username, password } = this.state;
    const user = {
      username: this.state.username,
      password: this.state.password
    }

      axios.post('https://soud-cloud-backend.herokuapp.com/api/user/login/' , user)
      .then(res => {
        localStorage.setItem('user', user.username);
        localStorage.setItem('token', res.data.token); 
        if (res.status === 200)  
        alert("Successfully signed in")
        window.location.reload();
      })
      .catch ((res) => {
        console.log(res);
        if (res.status === undefined) {
          alert('could not sign-in due to ' + res.status)
        }
    })
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
 
  render() {

    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name= 'username'
            type='username'
            handleChange={this.handleChange}
            value={this.state.username}
            label='username'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <button type='submit'> Sign in </button>
          </div>
          <Link to='/forgot'> Forgot password? </Link>
        </form>
      </div>
    );
  }
}

export default SignIn;
