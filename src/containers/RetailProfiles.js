import React from 'react';
import Dashboard from '../components/Dashboard';
import BottomNav from '../components/BottomNav';
import EditDialog from '../components/EditDialog';
import CreateContainer from '../containers/CreateContainer';
import $ from 'jquery';
import store from '../index';

class RetailProfiles extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      retailProfiles: [],
      dialogOpen: false,
      createDialogOpen: false,
      editRecord: {
        name: '',
        siteUrl: '',
        notes: '',
        vegan: '',
        slow: '',
        sustainable: '',
        independent: ''
      }
    }

    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleCreateDialogOpen = this.handleCreateDialogOpen.bind(this);
    this.handleCreateDialogClose = this.handleCreateDialogClose.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

  componentWillReceiveProps() {
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

  handleDialogOpen () {
    this.setState({dialogOpen: true});
  };

  handleCreateDialogOpen () {
    this.setState({createDialogOpen: true})
  }

  handleDialogClose () {
    this.setState({dialogOpen: false});
  };

  handleCreateDialogClose () {
    this.setState({createDialogOpen: false});
  };

  edit(id) {
    // Kick off GET AJAX to return the profile to be edited
    const currentStore = store.getState()
    const token = currentStore.session.user.token
    return $.ajax({
          url: '/retailprofiles/' + id,
          method: 'GET',
          headers: {
            Authorization: 'Token token=' + token
          },
        }).then((resp) => {
          console.log('response is ', resp)
          this.setState({
            editRecord: {
              name: resp.retailprofile.name,
              siteUrl: resp.retailprofile.siteUrl,
              notes: resp.retailprofile.notes,
              vegan: resp.retailprofile.vegan,
              slow: resp.retailprofile.slow,
              sustainable: resp.retailprofile.sustainable,
              independent: resp.retailprofile.independent
            }
          })})
            .then(this.handleDialogOpen())
  }

  delete(id) {
    let retailProfilesArray = this.state['retailProfiles']
    console.log('id being passed in is ', id)
    console.log('retail profiles array looks like ', retailProfilesArray)
    let retailProfiles = retailProfilesArray.filter(retailProfile => retailProfile.id !== id)
    this.setState({retailProfiles})
    // Kick off DELETE AJAX to delete record from backend
    const currentStore = store.getState()
    const token = currentStore.session.user.token
    console.log('this is the token for delete ', token)
    return $.ajax({
          url: '/retailprofiles/' + id,
          method: 'DELETE',
          headers: {
            Authorization: 'Token token=' + token
          },
        }).then((resp) => {
          console.log('this is the response ', resp) })
  }


  /**
   * Render the component.
   */
  render() {
    console.log('associated retail profiles ', this.state['retailProfiles'])
    return (
      <div>
      <Dashboard handleClick={this.delete} handleEdit={this.edit} handleDialogOpen={this.handleDialogOpen} retailProfiles={ this.state['retailProfiles'] }
      />
      <CreateContainer handleDialogClose={this.handleDialogClose} handleCreateDialogClose={this.handleCreateDialogClose} createDialogOpen={this.state.createDialogOpen}/>
      <EditDialog handleDialogClose={this.handleDialogClose} editRecord={this.state.editRecord} dialogOpen={this.state.dialogOpen} />
      <BottomNav handleCreateDialogOpen={this.handleCreateDialogOpen}/>
      </div>
    );
  }

}

export default RetailProfiles;
