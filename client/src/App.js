import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/sign-up' component={SignUp} />
        <Route exact path='/login' component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
