import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const LoginForm = ({
  onSubmit,
  onChange,
  validationErrors,
  user,
  ajaxError
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign In</h2>

      {/*IF conditions don't work in JSX. Below element will display ONLY if errors.summary contains something or is TRUE.*/}
      {ajaxError && <p className="error-message">{ajaxError}</p>}

      <div className="field-line">
        <TextField className="auth-field"
          floatingLabelText="Email"
          name="email"
          errorText={validationErrors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField className="auth-field"
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={validationErrors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <FlatButton type="submit" label="Sign In" primary />
      </div>

      <CardText>No not have an account? <Link to={'/sign-up'}>Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
