import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './global.css';

import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';

function App() {

  return (
    <Router>
      <div>
        <Header />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/course-details/:id' component={CourseDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
