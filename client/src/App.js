import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './global.css';

import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => {

  return (
    <Router>
      <div>
        <HeaderWithContext />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route exact path='/courses/create' component={CreateCourse} />
          <Route path='/courses/:id/update' component={UpdateCourse} />
          <Route exact path='/courses/:id' component={CourseDetail} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
        </Switch>

      </div>
    </Router>
  );
}