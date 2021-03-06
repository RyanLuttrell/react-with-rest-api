import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {

//Initialize state
  state = {
    email: '',
    password: '',
    errors: '',
  }

  render() {

//Deconstruct state for easier use
    const {
      email,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="email" 
                  name="email" 
                  type="text"
                  value={email} 
                  onChange={this.change} 
                  placeholder="Email" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
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

//When the user clicks the "Sign In" button, verify the authenticity of the user and display any necessary validation errors
  submit = () => {
    const {context} = this.props;
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    const {email, password} = this.state;
    context.actions.signIn(email, password)
      .then(user => {
        if (user.data === null) {
          this.setState(() => {
            return {
              errors: user
            }
          })
        } else {

//Send the user back to the page they were trying to access if they have successfully logged in
          this.props.history.push(from)
        }
      })
      .catch(error => {
        this.setState(() => {
          return {
            errors: [error.response.data.message] || []
          }
        })
        console.log(error.response)
      })
  }

//If the user clicks the "Cancel" button, send them back to the home root
  cancel = () => {
    this.props.history.push('/')
  }
}

