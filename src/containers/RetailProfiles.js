import React from 'react';
import Dashboard from '../components/Dashboard';
import $ from 'jquery';
import store from '../index';

class RetailProfiles extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      retailProfiles: []
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

  componentDidMount() {
  //  create an AJAX request to GET RetailProfiles for current user
  const currentStore = store.getState()
  const token = currentStore.session.user.token
  console.log('token looks like ', token)

    let self = this;

    return $.ajax({
          url: '/retailprofiles',
          method: 'GET',
          headers: {
            Authorization: 'Token token=' + token
          },
        }).then((resp) => {
          console.log('this is the response ', resp)
          const profiles = resp['retailprofiles'];
          console.log('profiles is', profiles)
          self.setState({
            retailProfiles: profiles
          })
        })
  }

  /**
   * Render the component.
   */
  render() {
    console.log('associated retail profiles ', this.state['retailProfiles'])
    return (
      <Dashboard retailProfiles = { this.state['retailProfiles'] }
      />
    );
  }

}

export default RetailProfiles;
