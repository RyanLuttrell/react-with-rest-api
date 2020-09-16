import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './global.css';

import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

export default () => {

  return (
    <Router>
      <div>
        <Header />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route exact path='/courses/create' component={CreateCourse} />
          <Route path='/courses/:id/update' component={UpdateCourse} />
          <Route exact path='/courses/:id' component={CourseDetail} />
          <Route path='/signin' component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
        </Switch>

      </div>
    </Router>
  );
}