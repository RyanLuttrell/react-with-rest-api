import React from 'react';

const CourseModule = (props) => {

    const url = `http://localhost:3000/course-details/${props.data.id}`

    return (
        <div className="grid-33"><a className="course--module course--link" href={url}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.data.title}</h3>
        </a></div>
    )
}

export default CourseModule;