import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from './utilities/firebase';
import { MainPage } from './components/MainPage';
import { useAuthState } from './utilities/firebase';

const Main = () => {
  const [user] = useAuthState();
  const [data, errorDb] = useDbData('/');

  if (errorDb) return <h1>Error loading data: {errorDb.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  return <MainPage data={data} />;

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
