import React from 'react';
import './App.css';
// Theme import required to get Material-UI working
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import RetailProfiles from './containers/RetailProfiles';
import store from './index';
import { sessionService } from 'redux-react-session';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';


import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
      <Router>
      <div>
        <div>
          <div className="top-bar">
            <div className="top-bar-left">
              <NavLink to="/" className="curate-logo">curate.</NavLink>
            </div>

            <div className="top-bar-right">
              <Link to="/sign-in">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
              <Link to="/change-password">Change Password</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
          <Route exact path="/" component={HomePage} />

          <Route path="/sign-in" component={LoginPage} />

          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/change-password" component={ChangePasswordPage} />
          <Route path="/dashboard" component={RetailProfiles}/>
      </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
