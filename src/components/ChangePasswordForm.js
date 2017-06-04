import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ChangePasswordForm = ({
  onSubmit,
  onChange,
  validationErrors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Change Password</h2>

      {/*IF conditions don't work in JSX. Below element will display ONLY if errors.summary contains something or is TRUE.*/}
      {validationErrors.passwordMatch && <p className="error-message">{validationErrors.passwordMatch}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Current Password"
          name="oldPw"
          errorText={validationErrors.oldPw}
          onChange={onChange}
          value={user.oldPw}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="New Password"
          type="password"
          name="newPw"
          onChange={onChange}
          errorText={validationErrors.newPw}
          value={user.newPw}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Confirm New Password"
          type="password"
          name="newConfirm"
          onChange={onChange}
          errorText={validationErrors.newConfirm}
          value={user.newConfirm}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Change Password" primary />
      </div>
    </form>
  </Card>
);

// Checks to ensure the below functions/objects are provided when a user is on the Sign-In page.
ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ChangePasswordForm;
