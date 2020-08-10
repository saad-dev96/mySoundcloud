import React from 'react';
import FormInput from '../form-input/form-input.component';
import axios from 'axios';
import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      fname: '',
      lname: '',
      email: '',
      password: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, fname, lname, email, password } = this.state;
    const user = {
      username: this.state.username,
      fname: this.state.fname,
      lname:this.state.lname,
      email:this.state.email,
      password: this.state.password
    };
    console.log(user);

      axios.post('https://soud-cloud-backend.herokuapp.com/api/user/create/', user)
      .then(res => {
        this.setState({ username: '', fname:'', lname:'', email: '', password: ''});
        localStorage.setItem('fname', this.state.username); 
        localStorage.setItem('lname', this.state.password); 
        alert ("Signed up successfully");
        //console.log("this is user " + localStorage.getItem('token'));
      })
      .catch ((res) => {
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
    const { username, fname, lname, email, password } = this.state;
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
            name='fname'
            value={this.state.fname}
            onChange={this.handleChange}
            label='First name'
            required
          />
           <FormInput
            type='text'
            name='lname'
            value={this.state.lname}
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
