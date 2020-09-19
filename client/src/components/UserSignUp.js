import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';

export default class UserSignUp extends Component {

//Initialize state
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
//Deconstruct the state object for easier use
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>

          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="email" 
                  name="email" 
                  type="text"
                  value={email} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <NavLink to="/signin">Click here</NavLink> to sign in!
          </p>
        </div>
      </div>
    );
  }

//Anytime there is a change in the text fields, update state 
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

//When the user clicks the "Sign Up" button, send a post request to the server with the information that they've input
  submit = async () => {
    const {firstName, lastName, email, password, confirmPassword} = this.state;

    if (password === confirmPassword) {
      await axios.post('http://localhost:5000/api/users', {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: password
      })
        .then(results => {
          this.props.history.push('/')
        })
//If they have not input all of the necessary information, show the necessary validation errors
        .catch(error => {
          this.setState(() => {
            return {
              errors: error.response.data.errors
            }
          })
          console.log(error.response)
        })
    } else {
      this.setState(() => {
        return{
          errors: ['Passwords do not match']
        }
      })
    }
  }

//If the user clicks the "Cancel" button, send them back to the home root
  cancel = () => {
    this.props.history.push('/')
  }
}