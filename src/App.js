import React from 'react';
import './App.css';
// Theme import required to get Material-UI working
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import RetailProfiles from './containers/RetailProfiles';
import CreateContainer from './containers/CreateContainer';
import { connect } from 'react-redux';

import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Redirect
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
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
          <Route exact path="/" render={() => (
             this.props.session.authenticated ? (
               <Redirect to="/dashboard" store={this.props.store}/>
             ) : (
               <LoginPage/>
             )
           )}/>

          <Route path="/sign-in" render={() => (
             this.props.session.authenticated ? (
               <Redirect to="/dashboard" store={this.props.store}/>
             ) : (
               <LoginPage/>
             )
           )}/>

          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/change-password" component={ChangePasswordPage} />

          <Route path="/dashboard" render={() => (
             !this.props.session.authenticated ? (
               <Redirect to="/sign-in"/>
             ) : (
               <RetailProfiles store={this.props.store}/>
            )
            )}/>
      </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { session : state.session };
}

export default connect(mapStateToProps)(App);
