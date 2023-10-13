import "./MainPage.css";
import Banner from './Banner';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import TermSelector from './TermSelector';
import Schedule from './Schedule';
import CourseSchedule from './CourseSchedule';
import { useState } from 'react';
import { checkConflict } from '../utilities/conflict';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useProfile } from "../utilities/profile";

export const MainPage = (data) => {
    const [profile, profileLoading, profileError] = useProfile();
    const [term, setTerm] = useState('Fall');
    // selected courses
    const [selected, setSelected] = useState([]);
    const toggleSelected = (item) => setSelected(
        checkConflict(selected, item) ? selected :
            selected.includes(item)
                ? selected.filter(x => x !== item)
                : [...selected, item]
    );
    // schedule button
    const [open, setOpen] = useState(false);
    const openSchedule = () => setOpen(true);
    const closeSchedule = () => setOpen(false);

    return (
        <div className='background'>
            <Banner title={data.data.title} onClick={closeSchedule} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Schedule open={open} close={closeSchedule}>
                                <CourseSchedule courses={selected} />
                            </Schedule>
                            <div className="subheader">
                                <TermSelector selection={term} setSelection={setTerm} />
                                <button className="btn btn-outline-dark" onClick={openSchedule}>Show Schedule</button>
                            </div>
                            <CourseList courses={data.data.courses} term={term} selected={selected} toggleSelected={toggleSelected} isAdmin={profile.isAdmin} />
                        </>
                    } />
                    <Route path="/course-form/:course" element={
                        <CourseForm />
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    )
};