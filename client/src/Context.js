import React, {Component} from 'react';
import Cookies from 'js-cookies';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };

    render() {
        const {authenticatedUser} = this.state;

        const value = {
            authenticatedUser: authenticatedUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }
        return (
            <Context.Provider value={this.value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = (username, password) => {
        axios.get('http://localhost:5000/users')
    }

    signOut = () => {
        this.setState({authenticatedUser: null})
        Cookies.remove('authenticatedUser')
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context}/>}
            </Context.Consumer>
        )
    }
}