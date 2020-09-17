import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
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
                  placeholder="lastName" />
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

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const {context} = this.props;
    const {firstName, lastName, email, password, confirmPassword} = this.state;
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }
    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({errors})
        } else {
          context.actions.signIn(email, password)
            .then(() => {
              this.props.history.push('/authenticated')
            });
          console.log(`${email} is successfully signed up and authenticated!`)
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error')
      })

  }

  cancel = () => {
    this.props.history.push('/')
  }
}