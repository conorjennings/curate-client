import React, { Component } from 'react';
import './App.css';
// Theme import required to get Material-UI working
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import Dashboard from './components/Dashboard';
import RetailProfiles from './containers/RetailProfiles';
import store from './index';
import { sessionService } from 'redux-react-session';

import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     store.getState().session.authenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/sign-up',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const isAuthenticated = store.getState()
//          <Route exact path="/" component={HomePage} />
//          <Route path="/sign-in" component={LoginPage}/>


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      store: this.props.store.getState()
  }
  console.log('this.state.store ', this.state.store)
};

  render() {
      // const test = this.props.store
      // const x = store.getState().session.authenticated
      // console.log('store',x)
      // console.log('test is ', test)
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
