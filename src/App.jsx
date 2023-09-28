import Banner from './components/Banner';
import CourseList from './components/CourseList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useJsonQuery } from './utilities/fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading class data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading class data...</h1>;
  if (!schedule) return <h1>No class data found</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
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
