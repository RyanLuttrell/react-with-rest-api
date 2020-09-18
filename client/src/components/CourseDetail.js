import React from 'react';
import {NavLink} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';

export default class CourseDetail extends React.Component {
// Initiate state to empty objects for the two variables
    state = {
        data: {},
        userData: {}
    }

//When the component mounts, fetch the appropriate course and modify state with the data
    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(results => {
            this.setState(() => {
                return {
                    data: results.data,
                    userData: results.data.User
                }
            })
        })
        .catch(error => console.log("Error fetching and parsing data", error))
    }

    render() {


//Set the variables for the component and destructure props and state
        const {context, match} = this.props;
        const courseId = match.params.id;
        const authUser = context.authenticatedUser;
        const {data} = this.state;
        const {userData} = this.state;

        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                <div className="grid-100">
                {
                    authUser !== null ?
                        authUser.id === userData.id ?
                            <React.Fragment>
                                <span><NavLink className='button' to={`/courses/${courseId}/update`}>Update Course</NavLink><button className='button' onClick={this.deleteCourse}>Delete Course</button></span>
                                <NavLink className='button button-secondary' to='/'>Return to List</NavLink>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <NavLink className='button button-secondary' to='/'>Return to List</NavLink>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <NavLink className='button button-secondary' to='/'>Return to List</NavLink>
                            </React.Fragment>
                }
                </div>
                
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{data.title}</h3>
                    <p>by {userData.firstName} {userData.lastName}</p>
                </div>
                <div className="course--description">
                    <p>
                        {data.description}
                    </p>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <ReactMarkdown source={data.estimatedTime} />
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown source={data.materialsNeeded} />
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        )
    }

//When the delete course button is clicked, send a delete request to the server with the appropriate information
    deleteCourse = async () => {
        const courseId = this.props.match.params.id
        const {context} = this.props;
        await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
            auth: {
                username: context.authenticatedUser.emailAddress,
                password: context.password
              }
        })
        this.props.history.push('/')
    }
}