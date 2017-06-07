import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import $ from 'jquery';
import store from '../index';
import { sessionService } from 'redux-react-session';

const circleIcon = <FontIcon className="material-icons">fiber_manual_record</FontIcon>;


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNav extends Component {

  signOutAjax(event) {
   event.preventDefault();
   // create an AJAX request Sign Out
   const currentStore = store.getState()
   const token = currentStore.session.user.token
   const id = currentStore.session.user.id

   console.log('token is ', token)
   console.log('id is ', id)

    return $.ajax({
    url: '/sign-out/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  }).then((resp) => {
    sessionService.deleteSession()
    sessionService.deleteUser()}).then(
    console.log('store.getState() ', store.getState()))
};


  // select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper className="bottom-nav" zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Add New"
            icon={circleIcon}
            onClick={this.props.handleCreateDialogOpen}
          />
          <BottomNavigationItem
            icon={circleIcon}
            label="Log Out"
            onClick={this.signOutAjax}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;
