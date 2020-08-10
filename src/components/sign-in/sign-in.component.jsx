import React, {useContext} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: ''
    };
  }

  handleSubmitForget = event => {
    
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(user);

      axios.get('https://soud-cloud-backend.herokuapp.com/user/password_reset/')
      .then(res => {
      })
      .catch ((res) => {
        console.log(res);
        if (res.status == undefined) {
          alert('COULD NOT FORGET PASSWORD')
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
        </form>
        <div className='buttons'>
            <button type='submit' onClick = {this.handleSubmitForget}> Forget password </button>
          </div>
      </div>
    );
  }
}

export default SignIn;
