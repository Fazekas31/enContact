import { AppContextProvider } from './context/AppContext';
import { Layout } from './components/templates/Layout';
import './styles/App.scss';

function App() {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
}

export default App;
