import React from 'react';
import store from '../index';
import $ from 'jquery';

import SingleInput from '../components/SingleInput';
import VeganButtonSelect from '../components/VeganButtonSelect';
import SlowButtonSelect from '../components/SlowButtonSelect';
import SustainableButtonSelect from '../components/SustainableButtonSelect';
import IndependentButtonSelect from '../components/IndependentButtonSelect';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const url = process.env.REACT_APP_API_URL


class EditContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      editDialogOpen: props.editDialogOpen,
      ajaxError: '',
      id: props.editRecord.id,
      name: props.editRecord.name,
      siteUrl: props.editRecord.siteUrl,
      notes: props.editRecord.notes,
      vegan: props.editRecord.vegan,
      slow: props.editRecord.slow,
      sustainable: props.editRecord.sustainable,
      independent: props.editRecord.independent
    };
    // console.log ('here are the edit props ', this.state)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleVeganClick = this.handleVeganClick.bind(this);
    this.handleSlowClick = this.handleSlowClick.bind(this);
    this.handleSustainableClick = this.handleSustainableClick.bind(this);
    this.handleIndependentClick = this.handleIndependentClick.bind(this);
    // will need function for handling cancel
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

   componentWillReceiveProps(nextProps) {
     this.setState({
       ajaxError: '',
       editDialogOpen : nextProps.editDialogOpen,
       id: nextProps.editRecord.id,
       name: nextProps.editRecord.name,
       siteUrl: nextProps.editRecord.siteUrl,
       notes: nextProps.editRecord.notes,
       vegan: nextProps.editRecord.vegan,
       slow: nextProps.editRecord.slow,
       sustainable: nextProps.editRecord.sustainable,
       independent: nextProps.editRecord.independent
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

  handleSlowClick(e) {
    this.setState({ slow: !this.state.slow});
  }

  handleSustainableClick(e) {
    this.setState({ sustainable: !this.state.sustainable});
  }

  handleIndependentClick(e) {
    this.setState({ independent: !this.state.independent});
  }

   handleFormSubmit(event) {
      // AJAX request for Edit
      event.preventDefault()

      const currentStore = store.getState()
      const token = currentStore.session.user.token
      // console.log('token is ', token)
      if(this.state.name == "") {
        this.setState({ ajaxError: "retailer name required" })
      }
      else {
      return $.ajax({
        url: url + '/retailprofiles/' + this.props.editRecord.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + token
        },
        data: {
          retailprofile: {
            name: this.state.name,
            siteUrl: this.state.siteUrl,
            vegan: this.state.vegan,
            notes: this.state.notes,
            slow: this.state.slow,
            sustainable: this.state.sustainable,
            independent: this.state.independent
          }
        }
      }).then(this.props.handleEditDialogClose).then((() => {  this.context.router.history.push("/dashboard")
    })).then(this.setState({
          ajaxError: '',
          name: '',
          siteUrl: '',
          vegan: false,
          notes: '',
          id: '',
          sustainable: false,
          independent: false,
          slow: false
    })).catch((error) => {this.setState({ ajaxError : 'retailer name required' })})
    }
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
      title="New Designer Find"
      actions={actions}
      modal={true}
      open={this.state.editDialogOpen}
    >
    {this.state.ajaxError && <p className="error-message">{this.state.ajaxError}</p>}
    <form className="container" onSubmit={this.handleFormSubmit}>
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
      <div className='button-container'>
        <VeganButtonSelect
            name={'vegan'}
            vegan={this.state.vegan}
            onClick={this.handleVeganClick}/> {/* User indicates if store is vegan friendly*/}
        <SlowButtonSelect
            name={'slow'}
            slow={this.state.slow}
            onClick={this.handleSlowClick}/> {/* User indicates if store is slow fashion*/}
        <SustainableButtonSelect
            name={'sustainable'}
            sustainable={this.state.sustainable}
            onClick={this.handleSustainableClick}/> {/* User indicates if store is sustainable fashion*/}
        <IndependentButtonSelect
            name={'independent'}
            independent={this.state.independent}
            onClick={this.handleIndependentClick}/> {/* User indicates if store is independent fashion*/}
      </div>
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
