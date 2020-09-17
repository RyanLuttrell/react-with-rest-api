import React, {Component, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

export default class UpdateCourse extends Component  {

    componentDidMount() {
        const courseId = this.props.match.params.id
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
        .then(results => {
            this.setState(() => {
                return {
                    title: results.data.title,
                    description: results.data.description,
                    estimatedTime: results.data.estimatedTime,
                    materialsNeeded: results.data.materialsNeeded
                }
            })
        })
        .catch(error => console.log("Error fetching and parsing data", error))
    }

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
      }
    
      render() {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          errors,
        } = this.state;



    return (
        <div>
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <div className="grid-66">
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
                            elements={() => (
                            <React.Fragment>
                                <input 
                                id="title" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} 
                                placeholder="Title" />
                                <input 
                                id="description" 
                                name="description" 
                                type="textarea"
                                value={description} 
                                onChange={this.change} 
                                placeholder="Course Description" />
                                <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text"
                                value={estimatedTime} 
                                onChange={this.change} 
                                placeholder="Estimated Time" />
                                <input 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                type="textarea"
                                value={materialsNeeded} 
                                onChange={this.change} 
                                placeholder="Materials Needed" />
                            </React.Fragment>
                            )} />
                    </div>    
                </div>
            </div>
        </div>
    )}

    submit = () => {
        const courseId = this.props.match.params.id
        const {context} = this.props;
        axios.put(`http://localhost:5000/api/courses/${courseId}`)
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

    cancel = () => {
        this.props.history.push('/')
      }
}