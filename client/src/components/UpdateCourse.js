import React, {Component} from 'react';
import axios from 'axios';
import Form from './Form';

export default class UpdateCourse extends Component  {

//On page load, fetch the details for the specific course and update state
    componentDidMount() {
        const courseId = this.props.match.params.id
        const request = axios.get(`http://localhost:5000/api/courses/${courseId}`)
        .then(results => {
            this.setState(() => {
                return {
                    title: results.data.title,
                    description: results.data.description,
                    estimatedTime: results.data.estimatedTime,
                    materialsNeeded: results.data.materialsNeeded,
                    UserId: results.data.User.id
                }
            })
        })
        .catch(error => console.log("Error fetching and parsing data", error))
        return request
    }


//Initialize state with the following variables
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        UserId: '',
        errors: []
      }
    
      render() {

//Deconstruct state for easier use
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
                    <div className='course--header'>
                        <h4 className='course--label'>Course</h4>
                    </div>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
                            elements={() => (
                            <React.Fragment>
                                <div className='grid-66'>
                                    <div>
                                        <input 
                                        className="input-title course--title--input" 
                                        id="title" 
                                        name="title" 
                                        type="text"
                                        value={title} 
                                        onChange={this.change} 
                                        placeholder="Title" />
                                    </div>
                                    <div className='course--description'>
                                        <textarea 
                                        className=''
                                        id="description" 
                                        name="description" 
                                        value={description} 
                                        onChange={this.change} 
                                        placeholder="Course Description" 
                                        />
                                    </div>
                                </div>

                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                className="course--time--input"
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text"
                                                value={estimatedTime} 
                                                onChange={this.change} 
                                                placeholder="Estimated Time" />
                                            </div>

                                            </li>
                                            <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea                                                 
                                                className=''
                                                id="materialsNeeded" 
                                                name="materialsNeeded"
                                                type="textarea"
                                                value={materialsNeeded} 
                                                onChange={this.change} 
                                                placeholder="Materials Needed" />
                                            </div>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                            )} />  
                </div>
            </div>
        </div>
    )}

//When the "Update Course" button is clicked take the variables that are in state and send thtem to the api as the new data for the course
    submit = async () => {
        const courseId = this.props.match.params.id
        const {context} = this.props;
        const UserId = this.state.UserId;
        const updates = {
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded
        }

//Only allow the changes to take place if the current user matches the UserId of the person that created the course in the first place
        if (UserId === context.authenticatedUser.id) {
            await axios.put(`http://localhost:5000/api/courses/${courseId}`, updates, {
                headers: {
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: context.authenticatedUser.emailAddress,
                    password: context.password
                  }
            })
                .catch(error => {
                    this.setState(() => {
                        return {
                            errors: error.response.data.errors || []
                        }
                    })
                    console.log(error.response)
                })
        } else {
            this.setState(() => {
                return {
                    errors:['Sorry, you do not have permission to make these changes']
                }
            })
        }
        if (this.state.errors.length === 0) {
            this.props.history.push(`/courses/${courseId}`)
        }
    }

//Anytime there is a change in the text fields, update state 
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }
//If the user clicks the "Cancel" button, send them to the home root
    cancel = () => {
        const courseId = this.props.match.params.id
        this.props.history.push(`/courses/${courseId}`)
      }
}