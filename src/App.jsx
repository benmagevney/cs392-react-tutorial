import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import TermSelector from './components/TermSelector';
import Schedule from './components/Schedule';
import CourseSchedule from './components/CourseSchedule';
import './App.css';
import { useState } from 'react';
import { useJsonQuery } from './utilities/fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { checkConflict } from './utilities/conflict';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = () => {
  // default term is Fall
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

  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading class data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading class data...</h1>;
  if (!schedule) return <h1>No class data found</h1>;
  return (
    <div className='background'>
      <Banner title={schedule.title} onClick={closeSchedule} />
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
              <CourseList courses={schedule.courses} term={term} selected={selected} toggleSelected={toggleSelected} />
            </>
          } />
          <Route path="/course-form/:course" element={
            <CourseForm />
          } />
        </Routes>


      </BrowserRouter>
    </div>
  )
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider >
  );
};

export default App;
