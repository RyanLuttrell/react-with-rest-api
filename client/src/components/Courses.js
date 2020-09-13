import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Courses = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => setData(response.data))
            .catch(error => console.log("Error fetching and parsing data", error))
    }, [])

    let results = data.map(result => 
        <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{result.title}</h3>
        </a></div>
    )
    return(
        <div className="bounds">
            {results}
        </div>
    )
}

export default Courses;