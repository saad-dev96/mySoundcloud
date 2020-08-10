import React, {useContext} from 'react';
import './forgot-password.styles.scss'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import FormInput from '../form-input/form-input.component';

class ForgotPassword extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
       email: ''
      };
    }
    handleSubmit = (event)  => {
        event.preventDefault();
        const { email} = this.state;

    axios.get('https://soud-cloud-backend.herokuapp.com/user/password_reset/')
    .then(res => {

    })
    .catch ((res) => {
      console.log(res);
      if (res.status === undefined) {
        alert('COULD NOT REQUEST FORGOT PASSWORD')
      }
  })
    
  }
    
          /*axios.post('https://soud-cloud-backend.herokuapp.com/api/user/login/' )
          .then(res => {
            localStorage.setItem('user', user.username);
            localStorage.setItem('token', res.data); 
            if (res.status === 200)  
            alert("Successfully signed in")
            window.location.reload();
          })
          .catch ((res) => {
            console.log(res);
            if (res.status === undefined) {
              alert('could not sign-in')
            }
        })*/
      
    
      handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
     
    
    render(){
        
        return(
            <div className='forgot-password'>
            <span>Enter your email </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name= 'email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='Email'
                        required
                    />
                    <div className='buttons'>
                        <button type='submit' onClick = {this.handleSubmit}> submit </button>
                    </div>
                </form>
            </div>
        )
  }
}
export default ForgotPassword;