import React from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';

export default class Header extends React.PureComponent {
    render() {
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        <Router>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </Router>
                    </nav>
                </div>
            </div>
        )
    }
}