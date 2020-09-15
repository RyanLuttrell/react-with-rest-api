import React, {useState, useEffect}  from 'react';
import axios from 'axios';

const CourseDetail = ({match}) => {

    const [data, setData] = useState({});
    const [userData, setUserData] = useState({})
    const courseId = match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(results => {
                setData(results.data)
                setUserData(results.data.User)
            })
            .catch(error => console.log("Error fetching and parsing data", error))
    }, [])

    return (
        <div>
            <div className="actions--bar">
            <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="/">Return to List</a></div>
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
                    <h3>14 hours</h3>
                </li>
                <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    )
}

export default CourseDetail;