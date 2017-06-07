import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SingleInput from '../components/SingleInput';
import ButtonSelect from '../components/ButtonSelect';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
const EditDialog = ({
  dialogOpen
}) => {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={dialogOpen}
        >
        <form className="container">
          <h5>New Retail Find</h5>
          <SingleInput
            inputType={'text'}
              title={'Retailer Name'}
              name={'name'}
              placeholder={'Add retailer name here'}/> {/* Name of Retail Space */}
          <SingleInput
            inputType={'text'}
              title={'Site Link'}
              name={'siteUrl'}
              placeholder={'Add link to site here'}/> {/* Website of Retail Space */}
          <SingleInput
            inputType={'text'}
              title={'Notes'}
              name={'notes'}
              placeholder={'Add any comments here'}/> {/* Any notes user wants to capture */}
          <ButtonSelect
              name={'vegan'}/> {/* User indicates if store is vegan friendly*/}
      </form>
        </Dialog>
      </div>
    );
  }

export default EditDialog;
