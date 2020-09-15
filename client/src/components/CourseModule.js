import React from 'react';
import {NavLink} from 'react-router-dom';

const CourseModule = (props) => {

    const url = `/course-details/${props.data.id}`

    return (
        <div className="grid-33"><NavLink className='course--module course--link' to={url}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.data.title}</h3>
        </NavLink>
        </div>
    )
}

export default CourseModule;