import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './global.css';

import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

function App() {

  return (
    <Router>
      <div>
        <Header />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/course-details/:id' component={CourseDetail} />
          <Route path='/signin' component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
