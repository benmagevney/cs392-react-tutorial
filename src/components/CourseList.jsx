import './CourseList.css';

const Course = ({ course }) => (
    <div className="card m-1 p-2">
        <div className="card-body">
            <h5 className='card-text'>{course.term} CS {course.number}</h5>
            <p className="card-text">{course.title}</p>
        </div>
        <div className="card-footer bg-white">
            <p className='card-text'>{course.meets}</p>
        </div>

    </div>
);
const CourseList = ({ courses }) => (
    <div className="course-list">
        {Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />)}
    </div >
);

export default CourseList;