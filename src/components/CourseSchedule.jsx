import './CourseSchedule.css';

const terms = ["Fall", "Winter", "Spring"];

const Course = ({ course }) => (
    <tr>
        <th scope="row">{course.number}</th>
        <td>{course.title}</td>
        <td>{course.meets}</td>
    </tr>
)

// from https://getbootstrap.com/docs/4.0/content/tables/
const Schedule = ({ courses }) => (
    <table className="table table-custom">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Meeting Time</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />)}
        </tbody>
    </table >
)

const ScheduleTerm = ({ courses, term, }) => (
    (courses.filter(course => course.term == term).length == 0) ?
        null :
        <div className="course-group">
            <div className="course-title">
                <h4>{term} Course Schedule</h4>
            </div>
            <Schedule courses={courses} />
        </div>
)

const CourseSchedule = ({ courses }) => (
    <div>
        {
            (courses.length === 0) ?
                <div className="no-course-group">
                    <h4>No courses selected</h4>
                    <p>Click on a course to select it.</p>
                </div>
                :
                <div>
                    {Object.entries(terms).map(([id, term]) => <ScheduleTerm key={id} courses={courses.filter(course => course.term == term)} term={term} />)}
                </div>
        }
    </div>
);

export default CourseSchedule;