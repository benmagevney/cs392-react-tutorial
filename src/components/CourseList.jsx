import './CourseList.css';

const Course = ({ course, selected, toggleSelected }) => (
    <div className="card m-1 p-2" onClick={() => toggleSelected(course)}
        style={{ borderColor: selected ? "#E07A5F" : "#3D405B", borderWidth: "0.1em", backgroundColor: "#F4F1DE" }}>
        <div className="card-body">
            <h5 className='card-text'>{course.term} CS {course.number}</h5>
            <p className="card-text">{course.title}</p>
        </div>
        <div className="card-footer">
            <p className='card-text'>{course.meets}</p>
        </div>

    </div>
);
const CourseList = ({ courses, term, selected, toggleSelected }) => (
    <div className="container">
        <div className="course-list">
            {Object.entries(courses).filter(([id, course]) => course.term == term).map(
                ([id, course]) => <Course key={id} course={course} selected={selected.includes(course)} toggleSelected={toggleSelected} />)}
        </div>
    </div>
);

export default CourseList;