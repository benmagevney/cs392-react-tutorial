import './CourseList.css';
import { checkConflict } from '../utilities/conflict';
import icon from '../assets/warning.svg';
import { Link } from 'react-router-dom';


const Course = ({ course, isSelected, toggleSelected, hasConflict }) => (
    <div className="card m-1 p-2" onClick={() => toggleSelected(course)}
        style={{ borderColor: isSelected ? "#E07A5F" : "#3D405B", borderWidth: "0.2em", backgroundColor: "#F4F1DE" }}>
        <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <h5 className='card-text'>{course.term} CS {course.number}</h5>
                {hasConflict && <img className='svg' src={icon} style={{ paddingBottom: "10px" }} />}
            </div>
            <p className="card-text">{course.title}</p>
        </div>
        <div className="card-footer">
            <p className='card-text'>{course.meets}</p>

        </div>
        <Link to={`/course-form/${course.term[0] + course.number}|${course.title}|${course.meets}`}>
            <button className="btn btn-outline-dark" style={{ width: "100px", }}>Edit</button>
        </Link>

    </div>
);
const CourseList = ({ courses, term, selected, toggleSelected }) => (
    <div className="container">
        <div className="course-list">
            {Object.entries(courses).filter(([id, course]) => course.term == term).map(
                ([id, course]) => <Course
                    key={id}
                    course={course}
                    isSelected={selected.includes(course)}
                    toggleSelected={toggleSelected}
                    hasConflict={checkConflict(selected, course)} />)}
        </div>
    </div>
);

export default CourseList;