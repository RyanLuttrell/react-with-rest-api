import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import CourseModule from './CourseModule';

export default class CreateCourse extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(response => this.setState(() => {
                return {
                    data: response.data
                }
            }))
            .catch(error => console.log("Error fetching and parsing data", error))
    }
    
    render() {
        const results = this.state.data.map(result => <CourseModule data={result} key={result.id}/>)

        return (
            <div className="bounds">
                {results}
                <div className="grid-33">
                    <NavLink className="course--module course--add--module" to='/courses/create'>
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </NavLink>
                </div> 
            </div> 
        )
    }
}