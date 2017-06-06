import React from 'react';
import Dashboard from '../components/Dashboard';
import BottomNav from '../components/BottomNav';
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

    this.delete = this.delete.bind(this);
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

  delete(id) {
    let retailProfilesArray = this.state['retailProfiles']
    console.log('id being passed in is ', id)
    console.log('retail profiles array looks like ', retailProfilesArray)
    let retailProfiles = retailProfilesArray.filter(retailProfile => retailProfile.id !== id)
    this.setState({retailProfiles})
  }

  /**
   * Render the component.
   */
  render() {
    console.log('associated retail profiles ', this.state['retailProfiles'])
    return (
      <div>
      <Dashboard handleClick={this.delete} retailProfiles = { this.state['retailProfiles'] }
      />
      <BottomNav />
      </div>
    );
  }

}

export default RetailProfiles;
