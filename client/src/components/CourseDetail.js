import React, {useState, useEffect}  from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const CourseDetail = ({match, context}) => {

    const [data, setData] = useState({});
    const [userData, setUserData] = useState({})
    const courseId = match.params.id;

    useEffect(() => {
        const user = axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(results => {
                setData(results.data)
                setUserData(results.data.User)
            })
            .catch(error => console.log("Error fetching and parsing data", error))
        console.log(context)
    }, [courseId])


    const deleteCourse = () => {
        axios.delete(`http://localhost:5000/api/courses/${courseId}`)
    }

    return (
        <div>
            <div className="actions--bar">
            <div className="bounds">
            <div className="grid-100">
            {
                context.authenticatedUser ? 
                    <React.Fragment>
                        <span><NavLink className='button' to={`/courses/${courseId}/update`}>Update Course</NavLink><button className='button' onClick={deleteCourse}>Delete Course</button></span>
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
                    <h3>{data.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    {data.materialsNeeded}
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    )
}

export default CourseDetail;