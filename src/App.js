// import logo from './logo.svg';
import './App.scss';
import Routes from './pages/Routes';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
