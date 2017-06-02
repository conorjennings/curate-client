import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './App.css';
// Theme import required to get Material-UI working
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <Router>
      <div>
        <div>
          <div className="top-bar">
            <div className="top-bar-left">
              <NavLink to="/">React App</NavLink>
            </div>

            <div className="top-bar-right">
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
      </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
