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
  dialogOpen,
  editRecord,
  handleDialogClose
}) => {

    console.log('editRecord is ', editRecord)

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleDialogClose}
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
          title="Edit Retail Profile"
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
              content={editRecord.name}
              placeholder={'Add retailer name here'}/> {/* Name of Retail Space */}
          <SingleInput
            inputType={'text'}
              title={'Site Link'}
              name={'siteUrl'}
              content={editRecord.siteUrl}
              placeholder={'Add link to site here'}/> {/* Website of Retail Space */}
          <SingleInput
            inputType={'text'}
              title={'Notes'}
              name={'notes'}
              content={editRecord.notes}
              placeholder={'Add any comments here'}/> {/* Any notes user wants to capture */}
          <ButtonSelect
              name={'vegan'}
              vegan={editRecord.vegan}/> {/* User indicates if store is vegan friendly*/}
      </form>
        </Dialog>
      </div>
    );
  }

export default EditDialog;
