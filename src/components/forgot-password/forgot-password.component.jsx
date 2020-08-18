import React, { useContext } from 'react';
import './forgot-password.styles.scss'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import FormInput from '../form-input/form-input.component';
import {URL} from '../../env'
import {resetPassword} from '../../env'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;

    axios.get(`${URL}${resetPassword}`)
      .then(res => {

      })
      .catch((res) => {
        console.log(res);
        if (res.status === undefined) {
          alert('COULD NOT REQUEST FORGOT PASSWORD')
        }
      })

  }


  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };


  render() {

    return (
      <div className='forgot-password'>
        <span>Enter your email </span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='Email'
            required
          />
          <div className='buttons'>
            <button type='submit' onClick={this.handleSubmit}> submit </button>
          </div>
        </form>
      </div>
    )
  }
}
export default ForgotPassword;