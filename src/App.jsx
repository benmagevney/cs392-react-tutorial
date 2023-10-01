import Banner from './components/Banner';
import CourseList from './components/CourseList';
import TermSelector from './components/TermSelector';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { useJsonQuery } from './utilities/fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Main = () => {
  // default term is Fall
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const toggleSelected = (item) => setSelected(
    selected.includes(item)
      ? selected.filter(x => x !== item)
      : [...selected, item]
  );

  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading class data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading class data...</h1>;
  if (!schedule) return <h1>No class data found</h1>;
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <TermSelector selection={term} setSelection={setTerm} />
      <CourseList courses={schedule.courses} term={term} selected={selected} toggleSelected={toggleSelected} />
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
