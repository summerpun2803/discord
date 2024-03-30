import React from 'react';
import './App.css';
import { BrowserRouter as Router,
         Switch,
         Route,
         Redirect, } from 'react-router-dom';
import Login from './auth/loginPage/LoginPage';
import Register from './auth/registerPage/RegisterPage';
import Dashboard from './dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/dashboard' >
            <Dashboard />
          </Route>
          <Route exact path = '/login' >
            <Login />
          </Route>
          <Route exact path = '/register' >
            <Register />
          </Route>
          
          <Route path = '/' >
            <Login />
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
