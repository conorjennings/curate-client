import React from 'react';
import store from '../index';
import $ from 'jquery';

import SingleInput from '../components/SingleInput';
import ButtonSelect from '../components/ButtonSelect';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class EditContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      editDialogOpen: props.editDialogOpen,
      id: props.editRecord.id,
      name: props.editRecord.name,
      siteUrl: props.editRecord.siteUrl,
      notes: props.editRecord.notes,
      vegan: props.editRecord.vegan,
    };
    console.log ('here are the edit props ', this.state)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleVeganClick = this.handleVeganClick.bind(this);
    // will need function for handling cancel
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

   componentWillReceiveProps(nextProps) {
     this.setState({
       editDialogOpen : nextProps.editDialogOpen,
       id: nextProps.editRecord.id,
       name: nextProps.editRecord.name,
       siteUrl: nextProps.editRecord.siteUrl,
       notes: nextProps.editRecord.notes,
       vegan: nextProps.editRecord.vegan
     })
   }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSiteChange(e) {
    this.setState({ siteUrl: e.target.value });
  }

  handleNotesChange(e) {
    this.setState({ notes: e.target.value });
  }

  handleVeganClick(e) {
    this.setState({ vegan: !this.state.vegan});
  }

   handleFormSubmit(event) {
      // AJAX request for Edit
      event.preventDefault()
      const currentStore = store.getState()
      const token = currentStore.session.user.token
      console.log('token is ', token)

      return $.ajax({
        url: '/retailprofiles/' + this.props.editRecord.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + token
        },
        data: {
          retailprofile: {
            name: this.state.name,
            siteUrl: this.state.siteUrl,
            vegan: this.state.vegan,
            notes: this.state.notes
          }
        }
      }).then(this.props.handleEditDialogClose).then((() => {  this.context.router.history.push("/dashboard")
    })).then(this.setState({
          name: '',
          siteUrl: '',
          vegan: false,
          notes: '',
          id: ''
    }))
    }

  /**
   * Render the component.
   */
  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleEditDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleFormSubmit}
      />,
    ];

    return (
    <div>
      <Dialog
      title="Edit Profile"
      actions={actions}
      modal={true}
      open={this.state.editDialogOpen}
    >
    <form className="container" onSubmit={this.handleFormSubmit}>
      <h5>New Retail Find</h5>
      <SingleInput
        inputType={'text'}
          title={'Retailer Name'}
          name={'name'}
          controlFunc={this.handleNameChange}
          content={this.state.name}
          placeholder={'Add retailer name here'}/> {/* Name of Retail Space */}
      <SingleInput
        inputType={'text'}
          title={'Site Link'}
          name={'siteUrl'}
          controlFunc={this.handleSiteChange}
          content={this.state.siteUrl}
          placeholder={'Add link to site here'}/> {/* Website of Retail Space */}
      <SingleInput
        inputType={'text'}
          title={'Notes'}
          name={'notes'}
          controlFunc={this.handleNotesChange}
          content={this.state.notes}
          placeholder={'Add any comments here'}/> {/* Any notes user wants to capture */}
      <ButtonSelect
          name={'vegan'}
          vegan={this.state.vegan}
          onClick={this.handleVeganClick}/> {/* User indicates if store is vegan friendly*/}
    </form>
  </Dialog>
  </div>
    );
  }
}

EditContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default EditContainer;
