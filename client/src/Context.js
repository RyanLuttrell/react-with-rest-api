import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: ''
  };

  render() {
    const {authenticatedUser, password} = this.state;

    const value = {
      authenticatedUser: authenticatedUser,
      password: password,
      actions: {
        signIn: this.signIn, 
        signOut: this.signOut
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async (email, password) => {
    const user = await axios.get('http://localhost:5000/api/users', {
      auth: {
        username: email,
        password: password
      }
    })
    
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user.data,
          password: password
        }
      })
      // Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1})
    }
    return user
  }

  signOut = () => {
    this.setState({authenticatedUser: null})
    Cookies.remove('authenticatedUser')
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}