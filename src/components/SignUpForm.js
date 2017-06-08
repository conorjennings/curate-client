import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const SignUpForm = ({
  onSubmit,
  onChange,
  validationErrors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {/*IF conditions don't work in JSX. Below element will display ONLY if errors.summary contains something or is TRUE.*/}
      {validationErrors.passwordMatch && <p className="error-message">{validationErrors.passwordMatch}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={validationErrors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={validationErrors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
          name="passwordConfirm"
          onChange={onChange}
          errorText={validationErrors.passwordConfirm}
          value={user.passwordConfirm}
        />
      </div>

      <div className="button-line">
        <FlatButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/sign-in'}>Sign in</Link></CardText>
    </form>
  </Card>
);

// Checks to ensure the below functions/objects are provided when a user is on the Sign-In page.
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
