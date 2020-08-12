import React from 'react';
import FormInput from '../form-input/form-input.component';
import axios from 'axios';
import './sign-up.styles.scss';
import { URL } from '../../env'
import { signup } from '../../env'
import { setItem } from '../../utils'
import { removeItem } from '../../utils'
import { getItem } from '../../utils'

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, first_name, last_name, email, password } = this.state;
    const user = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);

    axios.post(`${URL}${signup}`, user)
      .then(res => {
        setItem('first_name', this.state.username);
        setItem('last_name', this.state.password);
        this.setState({ username: '', first_name: '', last_name: '', email: '', password: '' });
        alert("Signed up successfully");
      })
      .catch((res) => {
        console.log(res);
        if (res.status == undefined) {
          alert('failed to sign-up')
        }
      })
  };


  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { username, first_name, last_name, email, password } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='text'
            name='first_name'
            value={this.state.first_name}
            onChange={this.handleChange}
            label='First name'
            required
          />
          <FormInput
            type='text'
            name='last_name'
            value={this.state.last_name}
            onChange={this.handleChange}
            label='last name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <button type='submit'>SIGN UP</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
